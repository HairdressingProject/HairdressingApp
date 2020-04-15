import React from 'react';
import './Topbar.scss';

/* import settings from '../../../img/icons/settings.svg';
import notifications from '../../../img/icons/notifications.svg';
import profile from '../../../img/icons/user.svg'; */

import hair from '../../../img/icons/hair.svg';
import hairText from '../../../img/icons/hairdressing-project.svg';

// import { TopbarMenuItem } from './TopBarMenuItem';


export const Topbar = () => {
    // const menuItems = ['settings', 'notifications', 'profile'];
    // const menuItemImgs = [settings, notifications, profile];

    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <img src={hair} className="top-bar-logo" alt="Logo" />
                <img src={hairText} className="top-bar-text" alt="Hairdressing Project" />
            </div>
            {/* <div className="top-bar-right">
                <ul className="menu">
                {
                    menuItems.map((item, index) => (
                        <li
                            
                            key={index}
                        >
                            <TopbarMenuItem
                                icon={menuItemImgs[index]}
                                text={item[0].toUpperCase().concat(item.slice(1))}
                            />
                        </li>
                    ))
                }
                </ul>
                
            </div>
 */}
        </div>
    )
}