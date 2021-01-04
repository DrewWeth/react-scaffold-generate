import React, {useContext} from "react";
import { Link, NavLink } from "react-router-dom";
import {deleteModel} from './Networking'
import {State} from './State'

export const Nav = ({scaffoldModels}) => {
    return <div className='navContainer'>
        <div>
            <h3>
                React Scaffold Generator
            </h3>
        </div>
        <div>
            <NavLink key={'home'} exact activeClassName={'navLinkActive'} className="spaceLeft navLink" to='/'>Home</NavLink>
            {Array.isArray(scaffoldModels) && scaffoldModels.map( (name, i) => {
                return <NavLink key={i} activeClassName={'navLinkActive'} className="spaceLeft navLink" to={`/${name}`}>
                    {name}
                </NavLink>
            })}
        </div>
    </div>
}

export const ActionButtons = ({ modelName, id, showDetails, showEdit }) =>{
    const { state, setState } = useContext(State)
    return <div>
        {showDetails && <Link to={`/${modelName}/${id}`} className="spaceRight navLink">Details</Link>}
        {showEdit && <Link to={`/${modelName}/${id}/edit`} className="spaceRight navLink">Edit</Link>}
        <Link to={'#'} className="spaceRight navLink" onClick={() => {
            if(window.confirm(`Confirm you wan to delete ${modelName}?`)){
                deleteModel(setState, state, modelName, id)
            }
        }}>Delete</Link>
    </div>
}