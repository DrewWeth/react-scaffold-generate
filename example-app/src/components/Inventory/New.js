import { useContext, useState } from 'react'
import { State } from '../State'
import { Link, useHistory } from 'react-router-dom';
import Form from '../Form';
import {stateCreateModel} from '../Networking'
import {NotificationManager} from 'react-notifications';
import {model} from './model.js'

function New () {
  const { state, setState } = useContext(State)
  const history = useHistory();
  const [lastLink, setLastLink] = useState()

  const notfificationClicked = (id) => (e) =>{
    history.push(`/inventory/${id}`)
  }

  const onSubmit = (e) => {
    const id = new Date().getTime().toString(36)
    stateCreateModel(setState, state, "inventory", {"_id": id, ...e.formData})
    NotificationManager.info("Go to details page", "Inventory created", undefined, notfificationClicked(id) );
    setLastLink(`/inventory/${id}`)
  }

  return (
    <div>  
        <Form 
          title={`New Inventory`} 
          modelDefinition={model} 
          onSubmit={onSubmit} 
          after={lastLink && 
            <div className='spacerTop'>
              <Link className='navLink' to={lastLink}>Go to model</Link>
            </div>
          }
        />
    </div>
  );
}

export default New;
