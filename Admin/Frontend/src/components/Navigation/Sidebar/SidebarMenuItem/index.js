import React from 'react';
import activeItem from '../../../../img/icons/caret-right-light.svg'
import './SidebarMenuItem.scss';

export const SidebarMenuItem = ({icon, text, isActive}) => (
    <div 
        className={
            isActive ? 
            ['item-container', 'item-container-active', 'grid-container'].join(' ')
            :
            ['item-container', 'grid-container'].join(' ')
    }>
        <button 
            className={
              isActive ?
              ['item-btn', 'item-btn-active', 'grid-x'].join(' ')
              :
              ['item-btn', 'grid-x'].join(' ')  
            }
        >
            <div className="cell small-4">
                <img 
                    src={isActive ? icon.light : icon.dark} 
                    alt={text} 
                    className="item-img"
                />
            </div>
            <div className="cell small-4">
                <span className="item-name">
                    {text}
                </span>
            </div>
            <div className="cell small-4">
                {
                    isActive ? 
                    <img src={activeItem} alt="Active item" className="item-active" />
                    :
                    ''
                }
            </div>
        </button>
    </div>
)