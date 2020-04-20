import React from 'react';
import "./Menu.scss";
import menu from '../../../img/icons/menu-dark.svg';

export const Menu = ({isActive, isSidebarOpen, setMenuOpen}) => {
    
    const menuContainerClasses = ['menu-container', 'grid-container'];
    const menuTextClasses = ['menu-name'];
    const activemenuClasses = ['menu-active'];
    const menuImgClasses = ['menu-img', 'cell', 'small-4'];

    if (isActive) {
        menuContainerClasses.push('menu-container-active');
    }

    if (!isSidebarOpen) {
        menuContainerClasses.push('menu-container-closed');
        menuTextClasses.push('menu-name-closed');
        activemenuClasses.push('menu-name-closed');
        menuImgClasses.push('menu-img-closed');
    }

    return (
        <div className="menu-container grid-container">
            <button 
                className="menu-btn grid-x" 
                onClick={() => setMenuOpen(true)}
            >
                <div className={menuImgClasses.join(' ')}>
                    <img 
                        src={menu} alt="Menu" 
                        style={{position: 'relative', width: '100%', height: '100%'}}
                    />
                </div>
                <div className="cell small-4">
                    <span className={menuTextClasses.join(' ')}>
                        Menu
                    </span>
                </div>
                <div className="cell small-4">
                    </div>
            </button>
        </div>
    )
}