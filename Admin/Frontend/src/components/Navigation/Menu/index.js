import React from 'react';
import {MenuItem} from './MenuItem';
import settingsDark from '../../../img/icons/settings-dark.svg';
import notificationsDark from '../../../img/icons/notifications-dark.svg';
import './Menu.scss';

export const Menu = ({isOpen}) => {
    const menuContainerClasses = ['menu-container'];

    if (!isOpen)
    {
        console.log('menu closed');
        menuContainerClasses.push('menu-container-closed');
    }

    const menuItems = [
        {
            text: 'Settings',
            icon: settingsDark
        },
        {
            text: 'Notifications',
            icon: notificationsDark
        }
    ];

    return (
        <div className={menuContainerClasses.join(' ')}>
            {
                menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        text={item.text}
                        icon={item.icon}
                    />
                ))
            }
        </div>
    )
}