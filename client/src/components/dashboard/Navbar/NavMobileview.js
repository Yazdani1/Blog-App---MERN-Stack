import React, { useState, useContext } from "react";
import "./navweb.css";
import "./navmobile.css";
import "./navheader.css";
import { FcAutomatic } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcRight } from "react-icons/fc";
import { GiBlackball, GiHamburgerMenu } from "react-icons/gi";

import { Link, NavLink, useHistory } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { SiResurrectionremixos } from "react-icons/si";
import { GrUserExpert } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import { AiFillDashboard } from "react-icons/ai";
import { UserContext } from "../../UserContext";

import { RiEditFill } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { RiSettings2Fill } from "react-icons/ri";
import { GiSkills } from "react-icons/gi";
import { BsHeartFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiRamProfile } from "react-icons/gi";
import { MdQuestionAnswer } from "react-icons/md";

const NavMobileview = () => {
  const [mobilesidebar, setMobilesidebar] = useState(false);

  const [userdetails, setUserdetails] = useContext(UserContext);

  const history = useHistory();

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    setUserdetails(null);
    history.push("/signin");
  };

  return (
    <div className="responsivenav">
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

          <NavLink
            to="/createpost"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <RiEditFill size={15} /> CreatePost
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/Dashboardprofile"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <FaUserNurse size={15} /> Profile
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/AddExperience"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <GiSkills size={15} /> Experience
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/favourite"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <BsHeartFill size={15} /> Favourite
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/my-comments"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <MdQuestionAnswer size={15} /> Comments
              </li>
            </div>
          </NavLink>

          <NavLink
            to="/message"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <AiFillMessage size={15} /> Messages
              </li>
            </div>
          </NavLink>

          <NavLink
            target={"_blank"}
            to={"/userprofile/" + (userdetails && userdetails._id)}
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-mobile-nav">
              <li onClick={() => setMobilesidebar(!mobilesidebar)}>
                <GiRamProfile size={15} /> Public Profile
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
};

export default NavMobileview;
