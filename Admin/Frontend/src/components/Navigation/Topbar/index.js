import React from 'react';
import './Topbar.scss';

/* import settings from '../../../img/icons/settings.svg';
import notifications from '../../../img/icons/notifications.svg';
import profile from '../../../img/icons/user.svg'; */

import hair from '../../../img/icons/hair.svg';
import hairText from '../../../img/icons/hairdressing-project.svg';

// import { TopbarMenuItem } from './TopBarMenuItem';


export const Topbar = () => {
<<<<<<< HEAD
    const menuItems = ['settings', 'notifications'];
    const menuItemImgs = [settings, notifications];

    return (
        <div className="top-bar">
                    <div className="top-bar-left grid-x">
                        <div class="cell small-2"></div>
                        <div class="cell small-2"><img src={hair}/></div>
                        <div class="cell small-6"><img src={hairText}/></div>
                        <div class="cell small-2"></div>
                    </div>                


                {/* <div className="top-bar-right cell small-4 large-2"> */}
                    <div className="top-bar-right">
                    <ul className="top-bar-items-container">
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
                    
                {/* </div> */}


            

=======
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
>>>>>>> 8a61ca1991658daa95bd5198026875d74bb99c24
        </div>
    )
}