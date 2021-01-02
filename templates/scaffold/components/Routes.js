import React from "react";
import { Route } from "react-router-dom";
import List from './List'
import Edit from './Edit'
import New from './New'
import Details from './Details'

const Routes = () =>{
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default Routes