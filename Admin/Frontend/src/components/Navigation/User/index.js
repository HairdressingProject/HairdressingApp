import React from 'react';
import "./User.scss";
import user from '../../../img/icons/user.svg';
import userSettings from '../../../img/icons/caret-down.svg';

export const User = ({isSidebarOpen}) => {
    const userNameClasses = ['user-name'];
    const userSettingsClasses = ['user-settings'];
    const userImgClasses = ['user-img'];

    if (!isSidebarOpen) {
        userNameClasses.push('user-sidebar-closed');
        userSettingsClasses.push('user-sidebar-closed');
        userImgClasses.push('user-img-closed');
    }

    return (
        <div className="user-container grid-container">
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
        </div>
    )
}