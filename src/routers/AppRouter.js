import React from 'react';
import {Router, Route, Switch} from "react-router-dom";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import LoginPage from "../components/LoginPage";
import {createBrowserHistory} from 'history';
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} exact={true}/>
                <PrivateRoute path="/create" component={AddExpensePage} exact={true}/>
                <PrivateRoute path="/edit/:id" component={EditExpensePage} exact={true}/>
                <PrivateRoute path="/help" component={HelpPage} exact={true}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;
