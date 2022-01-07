import React, { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import "./navmobilefront.css";
import "./navwebfront.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import { GiBlackball, GiHamburgerMenu } from "react-icons/gi";

import { AiFillDashboard } from "react-icons/ai";


import { RiEditFill } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { RiSettings2Fill } from "react-icons/ri";
import { GiSkills } from "react-icons/gi";
import { BsHeartFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiRamProfile } from "react-icons/gi";
import { MdQuestionAnswer } from "react-icons/md";




const Navmobileviewfront = () => {

    const [mobilesidebar, setMobilesidebar] = useState(false);

    const [userdetails, setUserdetails] = useContext(UserContext);
  
    const history = useHistory();
  
    const logOut = () => {
      window.localStorage.removeItem("tokenLogin");
      setUserdetails(null);
      history.push("/signin");
    };


    return (

        <div className="responsivenav-for-frontclient">
        <div className="container-fluid mobile-view-header">
          <p>
            <GiHamburgerMenu
              size={25}
              onClick={() => setMobilesidebar(!mobilesidebar)}
            />
          </p>
    
          <p className="profile-name">{userdetails && userdetails.name}</p>
  
        
  
          <div className="profile-image">
              {userdetails && userdetails.photo ? (
                <img src={userdetails && userdetails.photo} />
              ) : (
                <div className="profile-nave-avatar">
                  <h4>
                    {userdetails &&
                      userdetails.name.substring(0, 2).toUpperCase()}
                  </h4>
                </div>
              )}
            </div>
        </div>
  
        {mobilesidebar ? (
          <div className="mobile-nav">
            <NavLink
              to="/Dashboard"
              style={{ textDecoration: "none" }}
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              <div className="sidebar-mobile-nav">
                <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                  <AiFillDashboard size={20} /> Dashboard
                </li>
              </div>
            </NavLink>
  
            <div className="sidebar-mobile-nav" onClick={logOut}>
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <RiLogoutCircleRLine size={15} /> Log Out
              </li>
            </div>

          </div>
        ) : null}
      </div>

    );
}

export default Navmobileviewfront
