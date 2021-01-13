import Form from "@rjsf/material-ui";

export default ({title, modelDefinition, onSubmit, formData, after}) =>{
  var formDataCleaned = {...formData}
  const attrs = modelDefinition?.attrs || []
  
  const props = attrs.reduce( (prev, curr) =>{
    const {name, type} = curr
    prev[name] = { type, title: name }
    if(type === "boolean"){
      if(formDataCleaned[name] == null){
        formDataCleaned[name] = false
      }
    }
    return prev
  }, {})

  const uiSchema = attrs.reduce( (prev, curr) =>{
    const {name, field} = curr
    if(field){
      prev[name] = {"ui:widget":field}
    }
    return prev
  }, {})

  const schema = {
    title,
    type: "object",
    required: attrs.filter(attr => attr.required === true).map(attr => attr.name),
    properties: props
  };
  
    return <div className="formBox spacer">
        <Form schema={schema}
          onSubmit={onSubmit}
          uiSchema={uiSchema}
          formData={formDataCleaned}
          onError={(e) => console.warn(e) } />
      </div>
}