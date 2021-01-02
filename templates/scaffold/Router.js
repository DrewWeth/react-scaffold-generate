import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import List from './{{ComponentName}}/List'
import Edit from './{{ComponentName}}/Edit'
import New from './{{ComponentName}}/New'
import Details from './{{ComponentName}}/Details'
import { State } from './State'
import { Nav } from './Shared'
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import ScaffoldHome from './ScaffoldHome';

const Content = ({ children, hideBorder }) => {
    return <div className={`content ${!hideBorder && 'border'}`}>{children}</div>
}

const useStickyState = (defaultValue, key) => {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

export const Router = () => {
    const [state, setState] = useStickyState({ }, "_state")
    const passThrough = { state, setState }
    return (

            <State.Provider value={passThrough}>
                <BrowserRouter>
                <Content hideBorder={true}>
                    <Nav/>
                </Content>
                <Content>
                    <Switch>
                        <Route path="/scaffold" exact>
                            <ScaffoldHome/>
                        </Route>
                        <Route path="/{{componentName}}" exact>
                            <List />
                        </Route>
                        <Route path="/{{componentName}}/:id/edit" exact>
                            <Edit />
                        </Route>
                        <Route path="/{{componentName}}/new" exact>
                            <New />
                        </Route>
                        <Route path={`/{{componentName}}/:id`} exact>
                            <Details />
                        </Route>
                    </Switch>
                </Content>
                </BrowserRouter>
                <NotificationContainer/>
            </State.Provider >
    )
}

export default Router