import React, {useContext} from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
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
                return <NavLink key={i} activeClassName={'navLinkActive'} className="spaceLeft navLink" to={`/${name.toLowerCase()}`}>
                    {name}
                </NavLink>
            })}
        </div>
    </div>
}

export const BackButton = ({modelName, marginBottom}) => {
    const style = { marginBottom }
    return <Link style={style} className="block navLink spacer" to={`/${modelName}`}>Back to List</Link>
}

export const ActionButtons = ({ modelName, id, showDetails, showEdit, flipRightSpace = false}) =>{
    const { state, setState } = useContext(State)
    const classStr = `${flipRightSpace ? 'spaceLeft' : 'spaceRight'} navLink`
    return <div>
        {showDetails && <Link to={`/${modelName}/${id}`} className={classStr}>Details</Link>}
        {showEdit && <Link to={`/${modelName}/${id}/edit`} className={classStr}>Edit</Link>}
        <Link to={'#'} className={classStr} onClick={() => {
            if(window.confirm(`Confirm you wan to delete ${modelName}?`)){
                deleteModel(setState, state, modelName, id)
            }
        }}>Delete</Link>
    </div>
}