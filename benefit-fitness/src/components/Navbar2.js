import React, {useState} from "react";
import { MenuItems } from './MenuItems';
import './Navbar2.css';
import {Button} from "./Button";
// import React, { useState, useEffect } from 'react'


function Navbar2() {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Benefit Fitness
                <i className="fab fa-react"></i></h1>
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                {MenuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    )

                })}
            </ul>
            {/*<Button className='btn--outline'>Sign In</Button>*/}
        </nav>
    );
}

export default Navbar2;