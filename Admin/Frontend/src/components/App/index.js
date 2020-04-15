import React from 'react';
import "./App.scss";
import { Switch, Route } from 'react-router-dom';
import { Sidebar } from '../Navigation/Sidebar';
import { Topbar } from '../Navigation/Topbar';
import { Dashboard } from '../Dashboard';
import { SignIn } from '../SignIn';
import { SignUp } from '../SignUp';
import { ForgotPassword } from '../ForgotPassword';
import { NewPassword } from '../NewPassword';
import { MyAccount } from '../MyAccount';
import { Databases } from '../Databases';
import { Traffic } from '../Traffic';
import { Permissions } from '../Permissions';
import { Pictures } from '../Pictures';

const routes = [
    {
        path: "/sign_in",
        content: () => <SignIn />
    },
    {
        path: "/sign_up",
        content: () => <SignUp />
    },
    {
        path: "/forgot_password",
        content: () => <ForgotPassword />
    },
    {
        path: "/new_password",
        content: () => <NewPassword />
    },
    {
        path: "/dashboard",
        content: () => <Dashboard />
    },
    {
        path: "/my_account",
        content: () => <MyAccount />
    },
    {
        path: "/databases",
        content: () => <Databases />
    },
    {
        path: "/traffic",
        content: () => <Traffic />
    },
    {
        path: "/permissions",
        content: () => <Permissions />
    },
    {
        path: "/pictures",
        content: () => <Pictures />
    }
];

export const App = () => {
    return (
        <div>
        <div className="grid-x">
            <div className="cell small-12 large-12">
                <Topbar />
            </div>            
        </div>
        <div className="grid-x">
            <div className="cell small-7 large-2">
                <Sidebar routes={
                    routes.filter(route => 
                            route.path.includes('dashboard') ||
                            route.path.includes('databases') ||
                            route.path.includes('traffic') ||
                            route.path.includes('permissions') ||
                            route.path.includes('pictures')
                        )
                    } 
                />
            </div>
            

            
            <div className="cell small-5 large-10">
                <Switch>
                    {
                        routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.content />}
                            />
                        ))
                    }
                </Switch>
            </div>
        </div>
        </div>
    )
}