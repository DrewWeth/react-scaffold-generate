import React from "react";
import { Route, Switch } from "react-router-dom";
import List from './List'
import Edit from './Edit'
import New from './New'
import Details from './Details'

const Routes = () =>{
    return (
        <Switch>
            <Route path="/inventory" exact>
                <List />
            </Route>
            <Route path="/inventory/new" exact>
                <New />
            </Route>
            <Route path={`/inventory/:id`} exact>
                <Details />
            </Route>
            <Route path="/inventory/:id/edit" exact>
                <Edit />
            </Route>
        </Switch>
    )
}

export default Routes