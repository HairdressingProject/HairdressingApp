import React, {useState} from 'react';
import "./Menu2.scss";
import menu from '../../../img/icons/menu-dark.svg';
import menu2Settings from '../../../img/icons/caret-down.svg';
import Modal from 'react-foundation-modal';

import { Menu } from '../Menu';

import {MenuItem} from '../Menu//MenuItem';
import settingsDark from '../../../img/icons/settings-dark.svg';
import notificationsDark from '../../../img/icons/notifications-dark.svg';


import { MenuModal } from "../Menu2/MenuModal"
// import { Reveal } from "../Menu2/Reveal"


export const Menu2 = ({isSidebarOpen}) => {

    const menu2NameClasses = ['menu2'];
    const menu2SettingsClasses = ['menu2'];
    const menu2ImgClasses = ['menu2-img'];

    // Modal set up
    const [isModalOpen, setModalOpen] = useState(false);

    const showPopup = status => {
        setModalOpen(status);
    }

    const overlayStyle = {
        'backgroundColor': 'rgba(12, 24, 83, 0.62)'
    };

    const revealStyle = {
        'backgroundColor': 'rgba(12, 24, 83, 0.62)'
    };

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

    // End of modal set up
    
    if (!isSidebarOpen) {
        menu2NameClasses.push('menu2-sidebar-closed');
        menu2SettingsClasses.push('menu2-sidebar-closed');
        menu2ImgClasses.push('menu2-img-closed');
    }

    return (
        <div className="menu2-container grid-container">


            <button className="menu2-btn grid-x" onClick={() => showPopup(true)}>
                <div className="cell small-4">
                    <img src={menu} alt="Menu" className={menu2ImgClasses.join(' ')} />
                </div>
                <div className="cell small-4">
                    <span className={menu2NameClasses.join(' ')}>
                        Menu
                    </span>
                </div>
                <div className="cell small-4">
                    </div>
            </button>

            <Modal
                        open={isModalOpen}
                        closeModal={showPopup}
                        isModal={true}
                        size="full"
                        overlayStyle={overlayStyle}
                        revealStyle={revealStyle}
                        >
                            
                            <div className={"menu-classes"}>
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



                            {/* <button 
                                className="button" 
                                type="button" 
                                onClick={() => showPopup(false)} 
                            >
                                Close
                            </button> */}
                    </Modal>



        </div>
    )
}