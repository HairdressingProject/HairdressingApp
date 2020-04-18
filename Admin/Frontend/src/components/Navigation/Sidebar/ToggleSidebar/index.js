import React from 'react';
import './ToggleSidebar.scss';
import openMenu from '../../../../img/icons/caret-right-dark.svg';
import closeMenu from '../../../../img/icons/caret-left.svg';

export const ToggleSidebar = ({isOpen, setOpen}) => {
    const toggleMenuClasses = ['toggle-menu-container'];

    if (!isOpen) {
        toggleMenuClasses.push('toggle-menu-container-closed');
    }

    return (
        <button 
            onClick={() => setOpen(!isOpen)}
            className={toggleMenuClasses.join(' ')}
        >
            <img src={isOpen ? closeMenu : openMenu} alt="Toggle menu" />
        </button>
    )
}