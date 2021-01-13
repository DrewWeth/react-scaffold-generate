import { useContext, useState } from 'react'
import { State } from '../State'
import { Link, useHistory } from 'react-router-dom';
import Form from '../Form';
import {stateCreateModel} from '../Networking'
import {NotificationManager} from 'react-notifications';
import {model} from './model.js'
import { BackButton } from '../Shared';

function New () {
  const { state, setState } = useContext(State)
  const history = useHistory();
  const [lastLink, setLastLink] = useState()

  const notfificationClicked = (id) => (e) =>{
    history.push(`/${model.componentName}/${id}`)
  }

  const onSubmit = (e) => {
    const id = new Date().getTime().toString(36)
    stateCreateModel(setState, state, `${model.componentName}`, {"_id": id, ...e.formData})
    NotificationManager.info("Go to details page", `${model.ComponentName} created`, undefined, notfificationClicked(id) );
    setLastLink(`/${model.componentName}/${id}`)
  }

  return (
    <div>
        <BackButton modelName="inventory" marginBottom={'15px'}/>
        <Form 
          title={`New ${model.ComponentName}`} 
          modelDefinition={model}
          onSubmit={onSubmit}
        />
        {lastLink && 
          <div className='spacerTop'>
            <Link className='navLink' to={lastLink}>Go to model</Link>
          </div>
        }
    </div>
  );
}

export default New;
