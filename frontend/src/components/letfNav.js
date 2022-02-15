import React from 'react';
import { NavLink } from 'react-router-dom'

const LetfNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
            <div className="icons-bis">
                <NavLink to='/home' exact activeclassname="active-left-nav">
                <img src="./img/home.svg" alt="home" />
                </NavLink>
                <br />
                <NavLink to='/home' exact activeclassname="active-left-nav">
                <img src="./img/rocket.svg" alt="rocket" />
                </NavLink>
                <br />
                <NavLink to='/connection' exact activeclassname="active-left-nav">
                <img src="./img/user.svg" alt="home" />
                </NavLink>
            </div>
        </div>
    </div>
    );
};

export default LetfNav;