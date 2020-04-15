import React from 'react';
import './ToggleSidebar.scss';
import openMenu from '../../../../img/icons/caret-right-dark.svg';
import closeMenu from '../../../../img/icons/caret-left.svg';

export const ToggleSidebar = ({isOpen, setOpen}) => (
    <button 
        onClick={() => setOpen(!isOpen)}
        className="toggle-menu-container"
    >
        <img src={isOpen ? closeMenu : openMenu} alt="Toggle menu" />
    </button>
)