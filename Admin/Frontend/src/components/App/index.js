import React, { useState, useEffect } from 'react';
import "./App.scss";
import { Switch, Route, useLocation } from 'react-router-dom';
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
import { MenuItem } from '../Navigation/Menu/MenuItem';
import Modal from 'react-foundation-modal';
import settingsDark from '../../img/icons/settings-dark.svg';
import notificationsDark from '../../img/icons/notifications-dark.svg';
import { history } from '../../_helpers';
import { clearMessageAction } from '../../_actions';
import { useDispatch, useSelector } from 'react-redux';
import { DummyComponent } from '../DummyComponent';
import { PrivateRoute } from '../PrivateRoute';
import { Alert } from '../Alert';
import { Column } from 'react-foundation-components/lib/grid';

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
        private: true,
        content: () => <Dashboard />
    },
    {
        path: "/my_account",
        private: true,
        content: () => <MyAccount />
    },
    {
        path: "/databases",
        private: true,
        content: () => <Databases />
    },
    {
        path: "/traffic",
        private: true,
        content: () => <Traffic />
    },
    {
        path: "/permissions",
        private: true,
        content: () => <Permissions />
    },
    {
        path: "/pictures",
        private: true,
        content: () => <Pictures />
    },
    // temporary component
    {
        path: "/dummy",
        content: () => <DummyComponent />
    }
];

const App = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Declares 'isSideBarOpen' as a state variable. (https://reactjs.org/docs/hooks-state.html)

    const dispatch = useDispatch();

    useEffect(() => {
        history.listen(() => {
            // clear alert on location change
            dispatch(clearMessageAction);
        })
    }, []);

    // Modal set up
    const [isMenuOpen, setMenuOpen] = useState(false);

    const showMenu = status => {
        setMenuOpen(status);
    }

    const overlayStyle = {
        'backgroundColor': 'rgba(12, 24, 83, 0.62)'
    };

    const revealStyle = {
        'backgroundColor': 'rgba(12, 24, 83, 0.62)'
    };

    const menuItems = [
        {
            text: 'Settings',
            icon: settingsDark,
            subItems: [
                {
                    text: 'Privacy Policy',
                    type: 'link'
                },
                {
                    text: 'Pictures Storage',
                    type: 'link'
                },
                {
                    text: 'Show Notifications',
                    type: 'switch',
                    defaultChecked: true
                },
                {
                    text: 'Dark Mode',
                    type: 'switch',
                    defaultChecked: false
                }
            ]
        },
        {
            text: 'Notifications',
            icon: notificationsDark,
            subItems: [
                {
                    text: 'Notification 1'
                },
                {
                    text: 'Notification 2'
                }
            ]
        }
    ];

    // End of modal set up

    const sidebarContainerClasses = ['cell', 'small-7', 'large-2', "sidebar-container"];
    const topbarContainerClasses = ['grid-x', 'small-5', "right-container"];

    if (!isSidebarOpen) {
        sidebarContainerClasses.push("sidebar-container-closed");
        topbarContainerClasses.push("right-container-closed");
    }

    const location = useLocation();

    const authentication = useSelector(state => state.authentication);
    const [newUser, setNewUser] = useState(null);

    useEffect(() => {
        if (authentication.newUser && authentication.newUser.baseUser) {
            setNewUser(authentication.newUser.baseUser);
        }
    }, [authentication]);

    const dismissNewUser = () => {
        setNewUser(null);
    }

    const MainApp = (
        <div className="grid-x">
            {
                newUser ?
                    (
                        <Column className={"alert-container"}>
                            <Alert
                                show={true}
                                type="success"
                                message={`Welcome, ${newUser.firstName} ${newUser.lastName}!`}
                                dismiss={dismissNewUser}
                            />
                        </Column>
                    ) : ''
            }
            <div className={sidebarContainerClasses.join(' ')}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    setOpen={setSidebarOpen}
                    isMenuOpen={isMenuOpen}
                    setMenuOpen={showMenu}
                    routes={
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

            <div className={topbarContainerClasses.join(' ')}>
                <div className={["cell", "small-auto", "right-container-topbar"].join(' ')}>
                    <Topbar />
                </div>

                <div className={["cell", "small-auto", "right-container-content"].join(' ')}>

                    {/* Testing menu modal outside of the sidebar */}
                    <Modal
                        open={isMenuOpen}
                        closeModal={setMenuOpen}
                        isModal={true}
                        size="full"
                        overlayStyle={overlayStyle}
                        revealStyle={revealStyle}
                    >
                        {
                            menuItems.map((item, index) => (
                                <MenuItem
                                    key={index}
                                    text={item.text}
                                    icon={item.icon}
                                    subItems={item.subItems}
                                />
                            ))
                        }
                    </Modal>

                    <Switch>
                        {
                            routes.map((route, index) => {
                                return route.private ? (
                                    <PrivateRoute
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                    >
                                        <route.content />
                                    </PrivateRoute>
                                ) : (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            children={<route.content />}
                                        />
                                    )
                            })
                        }
                    </Switch>
                </div>
            </div>
        </div>
    );

    const LandingPages = (
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
    );

    if (
        location.pathname !== '/sign_in' &&
        location.pathname !== '/sign_up' &&
        location.pathname !== '/forgot_password' &&
        location.pathname !== '/new_password'
    ) {
        return (
            MainApp
        );
    }

    return (
        LandingPages
    );
}

export { App };