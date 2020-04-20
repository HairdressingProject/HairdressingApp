import React from 'react';
import './MenuItem.scss';
import { Switch, LinkWithDropdown } from 'react-foundation-components';

export const MenuItem = ({text, icon, subItems}) => {

    return (
        <div className="menu-item-container">
            <div className="dropdown-container grid-container">

            <LinkWithDropdown
                closeOnClickOutside
                dropdownPosition="bottom"
                dropdownStyle={{
                    zIndex: 10000,
                    WebkitBoxShadow: '0px 0px 20px 0px rgba(166,166,166,0.8)',
                    MozBoxShadow: '0px 0px 20px 0px rgba(166,166,166,0.8)',
                    boxShadow: '0px 0px 20px 0px rgba(166,166,166,0.8)'
                }}
                dropdownContent={
                    subItems ?
                    subItems.map((item, index) =>{
                        let content;

                        switch(item.type)
                        {
                            case 'link':
                                content = (
                                    <div key={index} className="dropdown-menu-item">
                                        <a href="#">
                                            {item.text || ''}
                                        </a>
                                    </div>
                                );
                                break;

                            case 'switch':
                                content = (
                                    <div key={index} className="dropdown-menu-item">
                                        <p>{item.text || ''}</p>
                                        <Switch defaultChecked={item.defaultChecked} />
                                    </div>
                                );
                                break;

                            default:
                                content = (
                                    <p key={index} className="dropdown-menu-item">
                                        {item.text || ''}
                                    </p>
                                );
                        }

                        return content;
                    }) : ''
                }
            >
               <button className="menu-item-btn grid-x" dropdown="true">
                    <div className="menu-item-img cell small-4">
                        <img 
                            src={icon} 
                            alt={text} 
                            style={{position: 'relative', width: '100%', height: '100%'}}
                        />
                    </div>
                    <div className="cell small-8">
                        <span className="menu-item-name">
                            {text}
                        </span>
                    </div>
                </button>
            </LinkWithDropdown>
            </div>
        </div>
    )
}