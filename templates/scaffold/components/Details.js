import React from 'react';
import './Component.css';
import {
    useParams
  } from "react-router-dom";
import {getModel} from '../Networking'
import { useContext, useState } from 'react'
import { State } from '../State'
import {ActionButtons} from '../Shared'

const Details = () => {
    const { state } = useContext(State)
    let { id } = useParams();
    const model = getModel(undefined, state, "{{componentName}}", id)
    const attrs = model ? Object.entries(model) : []

    console.log({attrs})
    return <div>
        {!Boolean(model) && <div>
            Model with ID {id} does not exist
        </div>}
        <div>
            {model && attrs.map( ([key, value]) => {
                return <div className="detailSection">
                    <b>{key}</b>: {value == null ? 'null' : value.toString()}
                </div>
            })}
        </div>
        <div>
            {model && <ActionButtons modelName={"{{componentName}}"} id={id} showEdit/>}
        </div>
    </div>
}

export default Details