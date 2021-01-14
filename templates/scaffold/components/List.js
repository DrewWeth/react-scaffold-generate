import { useContext } from 'react'
import { State } from '../State'
import { Link } from 'react-router-dom';
import {model} from './model.js'
import {ActionButtons} from '../Shared'

function List () {
  const { state } = useContext(State)
  const elements = state["{{ componentName }}"] || [] 
  const attrs = model && model.attrs ? model.attrs : []
  
  return (
    <div>
      <div className="flex">
        <h3>
          {{ ComponentName }} List
        </h3>
        <Link to='/{{componentName}}/new' className="navLink">New {{ComponentName}}</Link>
      </div>
      <div>
        <div className="styled-table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                {attrs.map(({name}, kIndex) =>{
                  return <th key={kIndex}>{name}</th>
                })}
                {elements.length > 0 && <th></th>}
              </tr>
            </thead>
            <tbody>
              {elements.map((element, eIndex) =>
                <tr key={eIndex}>
                  <td><code>{element["_id"]}</code></td>
                  {attrs.map(( {name}, vIndex) => {
                    return <td key={vIndex}><code>{element[name]}</code></td>
                  })}
                  <td className='rightAlign'>
                    <ActionButtons modelName={"{{componentName}}"} id={element["_id"]} flipRightSpace={true} showDetails showEdit />
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}

export default List;
