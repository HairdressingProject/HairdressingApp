import React from 'react';
import "./User.scss";
import user from '../../../img/icons/user.svg';
import userSettings from '../../../img/icons/caret-down.svg';

export const User = () => {
    return (
        <div className="user-container grid-container">
            <button className="user-btn grid-x">
                <div className="cell small-4">
                    <img src={user} alt="User" className="user-img" />
                </div>
                <div className="cell small-4">
                    <span className="user-name">
                        User
                    </span>
                </div>
                <div className="cell small-4">
                    <img src={userSettings} alt="User settings" className="user-settings" />
                </div>
            </button>
        </div>
    )
}