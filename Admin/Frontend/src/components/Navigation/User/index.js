import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../_actions';
import "./User.scss";
import user from '../../../img/icons/user.svg';
import userSettings from '../../../img/icons/caret-down.svg';

import { LinkWithDropdown } from 'react-foundation-components';

export const User = ({ isSidebarOpen }) => {
    const userNameClasses = ['user-name'];
    const userSettingsClasses = ['user-settings'];
    const userImgClasses = ['user-img'];

    const dispatch = useDispatch();
    const history = useHistory();

    if (!isSidebarOpen) {
        userNameClasses.push('user-sidebar-closed');
        userSettingsClasses.push('user-sidebar-closed');
        userImgClasses.push('user-img-closed');
    }

    /**
     * Dispatches a logout action. Redirects user to /sign_in.
     * @function handleLogout
     * @param {Object} e 
     */
    const handleLogout = () => {
        dispatch(userActions.logout());
        history.replace('/sign_in');
    }
    return (
        <div className="user-container grid-container">


            <LinkWithDropdown
                closeOnClickOutside
                dropdownStyle={{
                    zIndex: 10000,
                    WebkitBoxShadow: '0px 0px 20px 0px rgba(166,166,166,0.8)',
                    MozBoxShadow: '0px 0px 20px 0px rgba(166,166,166,0.8)',
                    boxShadow: '0px 0px 20px 0px rgba(166,166,166,0.8)'
                }}
                dropdownContent={
                    <div className="user-dropdown-container">
                        <button className="user-dropdown-btn grid-x">
                            <div className="cell small-12">
                                <span className="menu-item-name">
                                    My Account
                        </span>
                            </div>
                        </button>

                        <button
                            className="user-dropdown-btn grid-x"
                            onClick={e => handleLogout(e)}
                        >
                            <div className="cell small-12">
                                <span
                                    className="menu-item-name"
                                >
                                    Logout
                                </span>
                            </div>
                        </button>


                    </div>
                }
            >



                <button className="user-btn grid-x">
                    <div className="cell small-4">
                        <img src={user} alt="User" className={userImgClasses.join(' ')} />
                    </div>
                    <div className="cell small-4">
                        <span className={userNameClasses.join(' ')}>
                            User
                    </span>
                    </div>
                    <div className="cell small-4">
                        <img
                            src={userSettings}
                            alt="User settings"
                            className={userSettingsClasses.join(' ')}
                        />
                    </div>
                </button>
            </LinkWithDropdown>
        </div>
    )
}