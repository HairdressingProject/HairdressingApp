import React from 'react';
import './Dashboard.scss';

import 'foundation-sites/js/foundation';
import 'foundation-sites/js/foundation.reveal';

// import { MenuModal } from "../Menu2/MenuModal"
import { Reveal } from "../Navigation/Menu2/Reveal"


export const Dashboard = () => (
    <div className="dashboard-container">
        dashboard

        <div className="reveal" id="exampleModal1" data-reveal>
        <h1>Awesome. I am a Reveal</h1>
        </div>
        
        <div>
            <a data-open="exampleModal1">click</a>
            <br></br>
            <a data-open="item-modal">click2</a>
            <Reveal />
        </div>
        

    </div>
);