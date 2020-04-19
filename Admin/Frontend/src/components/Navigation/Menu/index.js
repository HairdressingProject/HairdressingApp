import React, {useState} from 'react';
import "./Menu.scss";
import menu from '../../../img/icons/menu-dark.svg';
import Modal from 'react-foundation-modal';
import {MenuItem} from '../Menu//MenuItem';
import settingsDark from '../../../img/icons/settings-dark.svg';
import notificationsDark from '../../../img/icons/notifications-dark.svg';




export const Menu = ({isSidebarOpen}) => {

    const menuNameClasses = ['menu'];
    const menuSettingsClasses = ['menu'];
    const menuImgClasses = ['menu-img'];

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
        menuNameClasses.push('menu-sidebar-closed');
        menuSettingsClasses.push('menu-sidebar-closed');
        menuImgClasses.push('menu-img-closed');
    }

    return (
        <div className="menu-container grid-container">


            <button className="menu-btn grid-x" onClick={() => showPopup(true)}>
                <div className="cell small-4">
                    <img src={menu} alt="Menu" className={menuImgClasses.join(' ')} />
                </div>
                <div className="cell small-4">
                    <span className={menuNameClasses.join(' ')}>
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