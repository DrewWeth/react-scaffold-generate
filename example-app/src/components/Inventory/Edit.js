import React, {useContext} from 'react';
import {
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

    const model = getModel(undefined, state, "inventory", id)

    const notificationClicked = () =>{
        history.push(`/inventory/${id}`)
    }
    
    const editModel = ({formData}) =>{
        updateModel(setState, state, "inventory", id, {...formData, _id: id})
        NotificationManager.info("Go to details page", "Inventory updated", undefined, notificationClicked );
    }

    return <div>
        {model ? 
            <div>
                <Form 
                title={'Edit Inventory'} 
                modelDefinition={modelDefinition} 
                formData={model} 
                onSubmit={editModel} 
                after={<ActionButtons showDetails modelName={"inventory"} id={id}/>}
                />
            </div>
        : <div>
            Model with ID {id} does not exist
        </div>}        
    </div>
}

export default Edit