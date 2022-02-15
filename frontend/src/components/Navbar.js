import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./appContext";
import Logout from "./logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.UserReducer);
  console.log(userData)
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/home">
            <div className="logo">
              <img src="./img/groupomania.png" alt="icon" />
              <h3>groupomania</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/connection">
                <h5>Bienvenue {userData.pseudo}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/connection">
                <img src="./img/login.svg" alt="login"/>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;