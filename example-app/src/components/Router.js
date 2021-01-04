import React, {lazy, Suspense} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { State } from './State'
import { Nav } from './Shared'
import {NotificationContainer} from 'react-notifications';
import ScaffoldHome from './ScaffoldHome';
import 'react-notifications/lib/notifications.css';
import './Component.css';

import models from './models.json'

const scaffoldModels = Object.keys(models)
const lazyRoutes = scaffoldModels.map(name => React.lazy(() => import(`./${name}/Routes`) ))

const Content = ({ children, hideBorder }) => {
    return (
        <div className="sidePadding">
            <div className={`content ${!hideBorder && 'border'}`}>
                {children}
            </div>
        </div>
    )
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
                <Nav scaffoldModels={scaffoldModels}/>
            </Content>
            <Content>
                <Switch>
                    <Route path="/" exact>
                        <ScaffoldHome/>
                    </Route>
                </Switch>
                <Suspense fallback={<div>Loading...</div>}>
                    {lazyRoutes.map((Routes, i) => Routes && <Routes key={i}/>)}
                </Suspense>
            </Content>
            </BrowserRouter>
            <NotificationContainer/>
        </State.Provider >
    )
}

export default Router