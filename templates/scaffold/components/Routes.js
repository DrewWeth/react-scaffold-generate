import React from "react";
import { Route, Switch } from "react-router-dom";
import List from './List'
import Edit from './Edit'
import New from './New'
import Details from './Details'

const Routes = () =>{
    return (
        <Switch>
            <Route path="/{{componentName}}" exact>
                <List />
            </Route>
            <Route path="/{{componentName}}/new" exact>
                <New />
            </Route>
            <Route path={`/{{componentName}}/:id`} exact>
                <Details />
            </Route>
            <Route path="/{{componentName}}/:id/edit" exact>
                <Edit />
            </Route>
        </Switch>
    )
}

export default Routes