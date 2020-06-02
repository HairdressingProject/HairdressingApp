import React from 'react';
import './MenuItem.scss';

export const MenuItem = ({ text, icon, subItems }) => {

    return (
        <div className="menu-item-container">
            <div className="dropdown-container grid-container">

                <button className="button" type="button" data-toggle="example-dropdown2">
                    Dropdown
                </button>

                <div class="dropdown-pane top" id="example-dropdown2" data-dropdown>
                    <button className="menu-item-btn grid-x" dropdown="true">
                        <div className="menu-item-img cell small-4">
                            <img
                                src={icon}
                                alt={text}
                                style={{ position: 'relative', width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className="cell small-8">
                            <span className="menu-item-name">
                                {text}
                            </span>
                        </div>
                    </button>
                    {
                        subItems ?
                            subItems.map((item, index) => {
                                let content;

                                switch (item.type) {
                                    case 'link':
                                        content = (
                                            <div key={index} className="dropdown-menu-item">
                                                <button>
                                                    {item.text || ''}
                                                </button>
                                            </div>
                                        );
                                        break;

                                    case 'switch':
                                        content = (
                                            <div key={index} className="dropdown-menu-item">
                                                <p>{item.text || ''}</p>
                                                <div class="switch">
                                                    <input class="switch-input" id="exampleSwitch" type="checkbox" name="exampleSwitch" checked={item.defaultChecked} />
                                                    <label class="switch-paddle" for="exampleSwitch">
                                                        <span class="show-for-sr">Download Kittens</span>
                                                    </label>
                                                </div>
                                                {/* <Switch defaultChecked={item.defaultChecked} /> */}
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
                </div>

                {/*  <LinkWithDropdown
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
                            subItems.map((item, index) => {
                                let content;

                                switch (item.type) {
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
                                                <div class="switch">
                                                    <input class="switch-input" id="exampleSwitch" type="checkbox" name="exampleSwitch" checked={item.defaultChecked} />
                                                    <label class="switch-paddle" for="exampleSwitch">
                                                        <span class="show-for-sr">Download Kittens</span>
                                                    </label>
                                                </div>
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
                                style={{ position: 'relative', width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className="cell small-8">
                            <span className="menu-item-name">
                                {text}
                            </span>
                        </div>
                    </button>
                </LinkWithDropdown> */}
            </div>
        </div>
    )
}