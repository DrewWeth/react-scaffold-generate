import React from 'react';
import {
    useParams
  } from "react-router-dom";
import {getModel} from '../Networking'
import { useContext } from 'react'
import { State } from '../State'
import {ActionButtons, BackButton} from '../Shared'
import {model as modelDefinition} from './model.js'

const Details = () => {
    const { state } = useContext(State)
    let { id } = useParams();
    const model = getModel(undefined, state, "inventory", id)
    const attrs = model && modelDefinition && modelDefinition.attrs ? modelDefinition.attrs : []

    return <div>
        <BackButton modelName="inventory" />
        <h3>Inventory</h3>
        {model ? attrs.map( ({name}) => {
            return <div className="detailSection">
                <b>{name}</b>: <code>{model[name] == null ? 'null' : model[name].toString()}</code>
            </div>
            }) 
        :
            <div>
                Model with ID {id} does not exist
            </div>
        }
        {model && <ActionButtons modelName={"inventory"} id={id} showEdit/>}
    </div>
}

export default Details