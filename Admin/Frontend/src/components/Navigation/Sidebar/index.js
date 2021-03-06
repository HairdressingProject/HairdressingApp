import React, { useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Sidebar.scss';
import { User } from '../User';
import { Menu } from '../Menu';
import { SidebarMenuItem } from './SidebarMenuItem';
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
    const menuItems = [...routes.map(route => route.path.slice(1))];
    const menuItemImgs = [
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

    // Initialise sidebar with the correct active item from the initial route
    // If there's no match, default to Dashboard
    const location = useLocation();
    const currentRoute = location.pathname.slice(1).toLowerCase();

    let initialActiveItem;

    if (menuItems.indexOf(currentRoute) > -1) {
        initialActiveItem = menuItems[menuItems.indexOf(currentRoute)]
    } 
    else {
        initialActiveItem = menuItems[0];
    }

    const [activeItem, setActiveItem] = useState(initialActiveItem);

    const sidebarContainerClasses = ['sidebar'];
    
    if (!isOpen) {
        sidebarContainerClasses.push('sidebar-closed');
    }

    return (
        <div className={sidebarContainerClasses.join(' ')}>     
            <User isSidebarOpen={isOpen} />
            <Menu 
                isActive={isMenuOpen}
                isSidebarOpen={isOpen} 
                setMenuOpen={setMenuOpen}
            /> 
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