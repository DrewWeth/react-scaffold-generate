import React, {useContext} from 'react';
import './Component.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
  } from "react-router-dom";
import {getModel, updateModel} from '../Networking'
import { State } from '../State'
import Form from '../Form'
import {ActionButtons} from '../Shared'
import {NotificationManager} from 'react-notifications';
import {model as modelDefinition} from './model.js'
import { useHistory } from "react-router-dom";

const Edit = () => {
    const { state, setState } = useContext(State)
    let { id } = useParams();
    const history = useHistory();

    const model = getModel(undefined, state, "{{componentName}}", id)

    const notificationClicked = () =>{
        history.push(`/{{componentName}}/${id}`)
    }
    
    const editModel = ({formData}) =>{
        updateModel(setState, state, "{{componentName}}", id, {...formData, _id: id})
        NotificationManager.info("Go to details page", "{{ComponentName}} updated", undefined, notificationClicked );
    }

    return <div>
        {Boolean(model) ? 
            <div>
                <Form 
                title={'Edit {{ComponentName}}'} 
                modelDefinition={modelDefinition} 
                formData={model} 
                onSubmit={editModel} 
                after={<ActionButtons showDetails modelName={"{{componentName}}"} id={id}/>}
                />
            </div>
        : <div>
            Model with ID {id} does not exist
        </div>}        
    </div>
}

export default Edit