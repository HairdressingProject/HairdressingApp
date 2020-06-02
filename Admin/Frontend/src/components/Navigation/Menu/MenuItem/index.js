import React from 'react';
import './MenuItem.scss';

export const MenuItem = ({ text, icon, subItems }) => {

    return (
        <div className="menu-item-container">
            <div className="dropdown-container expanded row text-center">

                <button className="expanded row dropdown-btn" data-toggle={`${text}-dropdown`}>
                    <div className="menu-item-img cell small-4">
                        <img
                            src={icon}
                            alt={text}
                            style={{ position: 'relative', width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className="cell small-8 text-center">
                        <span className="menu-item-name">
                            {text}
                        </span>
                    </div>
                </button>

                {
                    text.toLowerCase() === 'settings' ?
                        (
                            <div className="dropdown-pane" data-position="top" data-alignment="center" id={`${text}-dropdown`} data-dropdown data-auto-focus="true">
                                <div className="dropdown-menu-item">
                                    <a href="#">
                                        Privacy Policy
                                    </a>
                                </div>

                                <div className="dropdown-menu-item">
                                    <a href="#">
                                        Pictures Storage
                                    </a>
                                </div>

                                <div className="dropdown-menu-item">
                                    <p>Dark mode</p>
                                    <div className="switch">
                                        <input
                                            onChange={() => { }}
                                            className="switch-input"
                                            id="dark-mode"
                                            type="checkbox"
                                            name="dark-mode"
                                            defaultChecked={false} />
                                        <label className="switch-paddle" htmlFor="dark-mode">
                                            <span className="show-for-sr">Dark mode</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="dropdown-pane" data-position="bottom" data-alignment="center" id={`${text}-dropdown`} data-dropdown data-auto-focus="true">
                                <div className="dropdown-menu-item">
                                    <p>Show Notifications</p>
                                    <div className="switch">
                                        <input
                                            onChange={() => { }}
                                            className="switch-input"
                                            id="show-notifications"
                                            type="checkbox"
                                            name="show-notifications"
                                            defaultChecked={true} />
                                        <label className="switch-paddle" htmlFor="show-notifications">
                                            <span className="show-for-sr">Show Notifications</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </div>
    )
}