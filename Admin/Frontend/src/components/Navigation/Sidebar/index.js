import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.scss';
import { User } from '../User';
import { Menu2 } from '../Menu2';
import { SidebarMenuItem } from './SidebarMenuItem';
import menuLight from '../../../img/icons/menu-light.svg';
import menuDark from '../../../img/icons/menu-dark.svg';
import dashboardLight from '../../../img/icons/home-light.svg';
import dashboardDark from '../../../img/icons/home-dark.svg';
import databasesLight from '../../../img/icons/databases-light.svg';
import databasesDark from '../../../img/icons/databases-dark.svg';
import trafficLight from '../../../img/icons/traffic-light.svg';
import trafficDark from '../../../img/icons/traffic-dark.svg';
import permissionsLight from '../../../img/icons/permissions-light.svg';
import permissionsDark from '../../../img/icons/permissions-dark.svg';
import picturesLight from '../../../img/icons/pictures-light.svg';
import picturesDark from '../../../img/icons/pictures-dark.svg';
import { ToggleSidebar } from './ToggleSidebar';

export const Sidebar = ({routes, isOpen, setOpen, isMenuOpen, setMenuOpen}) => {
    const menuItems = ['menu', ...routes.map(route => route.path.slice(1))];
    const menuItemImgs = [
        {
            light: menuLight,
            dark: menuDark
        },
        {
            light: dashboardLight,
            dark: dashboardDark
        },
        {
            light: databasesLight,
            dark: databasesDark
        },
        {
            light: trafficLight,
            dark: trafficDark
        },
        {
            light: permissionsLight,
            dark: permissionsDark
        },
        {
            light: picturesLight,
            dark: picturesDark
        }
    ];

    
    const [activeItem, setActiveItem] = useState(menuItems[1]);

    const sidebarContainerClasses = ['sidebar'];
    
    if (!isOpen) {
        sidebarContainerClasses.push('sidebar-closed');
    }

    if (activeItem === menuItems[0]) {
        setMenuOpen(true);
    } 
    else {
        setMenuOpen(false);
    }

    return (
        <div className={sidebarContainerClasses.join(' ')}>     
            <User isSidebarOpen={isOpen} />
            <Menu2 isSidebarOpen={isOpen} /> 
            <ul className="sidebar-items-container">
                {
                    menuItems.map((item, index) => (
                        <li 
                            onClick={() => setActiveItem(menuItems[index])}
                            key={index}
                        >
                            <Link to={`/${item}`}>
                                <SidebarMenuItem 
                                    icon={menuItemImgs[index]}
                                    text={item[0].toUpperCase().concat(item.slice(1))}
                                    isActive={activeItem === item}
                                    isSidebarOpen={isOpen}
                                />
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <ToggleSidebar isOpen={isOpen} setOpen={setOpen} />
        </div>
    )
}