import React from 'react';
import activeItem from '../../../../img/icons/caret-right-light.svg'
import './SidebarMenuItem.scss';

export const SidebarMenuItem = ({icon, text, isActive, isSidebarOpen}) => {
    const itemContainerClasses = ['item-container', 'grid-container'];
    const itemTextClasses = ['item-name'];
    const activeItemClasses = ['item-active'];
    const itemImgClasses = ['item-img', 'cell', 'small-4'];

    if (isActive) {
        itemContainerClasses.push('item-container-active');
    }

    if (!isSidebarOpen) {
        itemContainerClasses.push('item-container-closed');
        itemTextClasses.push('item-name-closed');
        activeItemClasses.push('item-name-closed');
        itemImgClasses.push('item-img-closed');
    }

    return (
        <div className={itemContainerClasses.join(' ')}>
            <button 
                className={
                isActive ?
                ['item-btn', 'item-btn-active', 'grid-x'].join(' ')
                :
                ['item-btn', 'grid-x'].join(' ')  
                }
            >
                <div className={itemImgClasses.join(' ')}>
                    <img 
                        src={isActive ? icon.light : icon.dark} 
                        alt={text} 
                        style={{position: 'relative', width: '100%', height: '100%'}}
                    />
                </div>
                <div className="cell small-4">
                    <span className={itemTextClasses.join(' ')}>
                        {text}
                    </span>
                </div>
                <div className="cell small-4">
                    {
                        isActive ? 
                        <img 
                            src={activeItem} 
                            alt="Active item" 
                            className={activeItemClasses.join(' ')} 
                        />
                        :
                        ''
                    }
                </div>
            </button>
    </div>
    );
}