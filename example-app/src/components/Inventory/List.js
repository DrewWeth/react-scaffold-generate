import { useContext } from 'react'
import { State } from '../State'
import { Link } from 'react-router-dom';
import {model} from './model.js'
import {ActionButtons} from '../Shared'

function List () {
  const { state, setState } = useContext(State)
  const elements = state["inventory"] || [] 

  return (
    <div>
      <div className="flex">
        <h3>
          Inventory List
        </h3>
        <Link to='/inventory/new' className="navLink">New Inventory</Link>
      </div>
      <div>
        <table className="styled-table block">
          <thead>
            <tr>
              <th>ID</th>
              {model && model?.attr?.map(({name}, kIndex) =>{
                return <th key={kIndex}>{name}</th>
              })}
              {elements.length > 0 && <th></th>}
            </tr>
          </thead>
          <tbody>
            {elements.map((element, eIndex) =>
              <tr key={eIndex}>
                <td>{element["_id"]}</td>
                {model?.attr?.map((attribute, vIndex) => {
                  return <td key={vIndex}>{element[attribute.name]}</td>
                })}
                <td className='rightAlign'>
                  <ActionButtons modelName={"inventory"} id={element["_id"]} showDetails showEdit />
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
