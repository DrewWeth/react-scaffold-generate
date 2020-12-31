import { useContext, useState, useEffect } from 'react'
import { State } from '../State'
import './Component.css';
import { Link } from 'react-router-dom';
import {model} from './model.js'
import {ActionButtons} from '../Shared'
import {setModelList} from '../Networking'

function List () {
  const { state, setState } = useContext(State)
  const elements = state["{{ componentName }}"] || [] 

  return (
    <div>
      <div className="flex">
        <h3>
          {{ ComponentName }} List
        </h3>
        <Link to='/{{componentName}}/new' className="navLink">New {{ComponentName}}</Link>
      </div>
      <div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>ID</th>
              {model && model.map(({name}, kIndex) =>{
                return <th key={kIndex}>{name}</th>
              })}
              {elements.length > 0 && <th></th>}
            </tr>
          </thead>
          <tbody>
            {elements.map((element, eIndex) =>
              <tr key={eIndex}>
                <td>{element["_id"]}</td>
                {model.map((attribute, vIndex) => {
                  return <td key={vIndex}>{element[attribute.name]}</td>
                })}
                <td className='rightAlign'>
                  <ActionButtons modelName={"{{componentName}}"} id={element["_id"]} showDetails showEdit />
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default List;
