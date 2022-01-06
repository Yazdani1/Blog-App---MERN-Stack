import React, { useState } from "react";
import "./navweb.css";
import "./navmobile.css";
import { FcAutomatic } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcRight } from "react-icons/fc";
import { GiBlackball, GiHamburgerMenu } from "react-icons/gi";

import { Link, NavLink } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { SiResurrectionremixos } from "react-icons/si";
import { GrUserExpert } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";


const NavMobileview = () => {
  
  const [mobilesidebar, setMobilesidebar] = useState(false);

  return (
    <div>
      {/* <button onClick={() => setSidebar(false)}>Hide Navbar</button> */}

      <div className="responsivenav">
        <p>
          <GiHamburgerMenu
            size={25}
            onClick={() => setMobilesidebar(!mobilesidebar)}
          />
        </p>

        {mobilesidebar ? (
          <div className="mobile-nav">
            <NavLink
              to="/home"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive ? "largenavactive" : "inactive"
              }
            >
              <div className="sidebar-mobile-nav">
                {/* <AiFillHome size={20} onClick={() => setSidebar(!sidebar)} /> */}

                <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                  <AiFillHome size={15} /> Home
                </li>
              </div>
            </NavLink>

            <NavLink
              to="/Post"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive ? "largenavactive" : "inactive"
              }
            >
              <div className="sidebar-mobile-nav">
                <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                  <SiResurrectionremixos size={15} />
                  CreatePost
                </li>
              </div>
            </NavLink>

            <NavLink
              to="/Profile"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive ? "largenavactive" : "inactive"
              }
            >
              <div className="sidebar-mobile-nav">
                <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                  <CgProfile size={15} /> Profile
                </li>
              </div>
            </NavLink>

            <NavLink
              to="/Experience"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive ? "largenavactive" : "inactive"
              }
            >
              <div className="sidebar-mobile-nav">
                <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                  <GrUserExpert size={15} /> Experience
                </li>
              </div>
            </NavLink>

            <NavLink
              to="/Logout"
              style={{ textDecoration: "none" }}
              className={({ isActive }) =>
                isActive ? "largenavactive" : "inactive"
              }
            >
              <div className="sidebar-mobile-nav">
                <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                  <AiOutlineLogout size={15} /> Log Out
                </li>
              </div>
            </NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavMobileview;
