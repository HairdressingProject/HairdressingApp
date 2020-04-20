import React, {useState} from 'react';
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
import {MenuItem} from '../Navigation/Menu/MenuItem';
import Modal from 'react-foundation-modal';
import settingsDark from '../../img/icons/settings-dark.svg';
import notificationsDark from '../../img/icons/notifications-dark.svg';

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
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Declares 'isSideBarOpen' as a state variable. (https://reactjs.org/docs/hooks-state.html)
    
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

    const sidebarContainerClasses = ['cell', 'small-7', 'large-2', 'sidebar-container'];
    const topbarContainerClasses = ['grid-x', 'small-5', 'right-container'];

    if (!isSidebarOpen)
    {
        sidebarContainerClasses.push('sidebar-container-closed');
        topbarContainerClasses.push('right-container-closed');
    }

    return (
        <div className="grid-x">
            <div className={sidebarContainerClasses.join(' ')}>
                <Sidebar 
                    isOpen = {isSidebarOpen}
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
                <div className="cell small-auto right-container-topbar">
                    <Topbar />
                </div>

                <div className="cell small-auto right-container-content">

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