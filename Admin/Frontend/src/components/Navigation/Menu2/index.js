import React from 'react';
import "./Menu2.scss";
import menu from '../../../img/icons/menu-dark.svg';
import menu2Settings from '../../../img/icons/caret-down.svg';

import { MenuModal } from "../Menu2/MenuModal"
// import { Reveal } from "../Menu2/Reveal"


export const Menu2 = ({isSidebarOpen}) => {
    const menu2NameClasses = ['menu2'];
    const menu2SettingsClasses = ['menu2'];
    const menu2ImgClasses = ['menu2-img']
    
    if (!isSidebarOpen) {
        menu2NameClasses.push('menu2-sidebar-closed');
        menu2SettingsClasses.push('menu2-sidebar-closed');
        menu2ImgClasses.push('menu2-img-closed');
    }

    return (
        <div className="menu2-container grid-container">

            {/* <Reveal/> */}



            <button className="menu2-btn grid-x button" dataopen="exampleModal1">
                <div className="cell small-4">
                    <img src={menu} alt="Menu" className={menu2ImgClasses.join('')} />
                </div>
                <div className="cell small-4">
                    <span className={menu2NameClasses.join(' ')}>
                        Menu
                    </span>
                </div>
                <div className="cell small-4">
                    <img 
                        src={menu2Settings} 
                        alt="User settings" 
                        className={menu2SettingsClasses.join(' ')}
                    />
                    </div>
            </button>
        </div>
    )
}