import Form from "@rjsf/material-ui";

export default ({title, modelDefinition, onSubmit, formData, after}) =>{
  var formDataCleaned = {...formData}
  const props = modelDefinition.reduce( (prev, curr) =>{
    const {name, type} = curr
    prev[name] = { type, title: name }
    if(type === "boolean"){
      if(formDataCleaned[name] == null){
        formDataCleaned[name] = false
      }
    }
    return prev
  }, {})

  const uiSchema = modelDefinition.reduce( (prev, curr) =>{
    const {name, field} = curr
    if(field){
      prev[name] = {"ui:widget":field}
    }
    return prev
  }, {})

  const schema = {
    title,
    type: "object",
    required: Object.keys(props),
    properties: props
  };
  
    return <div className='formContainer'>
      <div className="formBox">
        <Form schema={schema}
          onSubmit={onSubmit}
          uiSchema={uiSchema}
          formData={formDataCleaned}
          onError={(e) => console.warn(e) } />
    
      </div>
      <div className="padding20">
        {after}
      </div>
    </div>
}