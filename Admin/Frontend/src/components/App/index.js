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
import { Menu } from '../Navigation/Menu';
import Modal from 'react-foundation-modal';

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
    const [isMenuOpen, setMenuOpen] = useState(true);

    // Modal set up
    const [isModalOpen, setModalOpen] = useState(false);

    const showPopup = status => {
        setModalOpen(status);
    }

    const overlayStyle = {
        'backgroundColor': 'rgba(33,10,10,.45)'
    };

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
                    setMenuOpen={setMenuOpen}
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
                    {/* <Menu isOpen={isMenuOpen} /> */} 

                    {/* Modal code */}
                    <p>
                        <button
                            className="button"
                            onClick={() => showPopup(true)}
                        >
                            Open modal
                        </button>
                    </p>
                    
                    <Modal
                        open={isModalOpen}
                        closeModal={showPopup}
                        isModal={true}
                        size="large"
                        overlayStyle={overlayStyle}
                        >
                            <h1>Awesome. I Have It.</h1>
                            <p className="lead">Your couch. It is mine.</p>
                            <p>I'm a cool paragraph that lives inside of an even cooler modal. Wins!</p>
                            <button 
                                className="button" 
                                type="button" 
                                onClick={() => showPopup(false)} 
                            >
                                Close
                            </button>
                    </Modal>

                    {/* End of modal code */}

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