import React, { useState } from "react";
import "./navweb.css";
import "./navheader.css";
import { FcAutomatic } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcRight } from "react-icons/fc";
import { GiBlackball, GiHamburgerMenu } from "react-icons/gi";

import { NavLink } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { SiResurrectionremixos } from "react-icons/si";
import { GrUserExpert } from "react-icons/gr";
import { AiOutlineLogout } from "react-icons/ai";
import NavMobileview from "./NavMobileview";


import { AiFillDashboard } from "react-icons/ai";
import { RiEditFill } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { RiSettings2Fill } from "react-icons/ri";
import { GiSkills } from "react-icons/gi";
import { Link, useHistory } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiRamProfile } from "react-icons/gi";
import { MdQuestionAnswer } from "react-icons/md";




import Navheader from "./Navheader";

const Navwebview = (props) => {
  // const [sidebar, setSidebar] = useState(true);

  // const openNavbar = () => {
  //   setSidebar(!sidebar);
  // };

  return (
    <div>
            
      {props.sidebar ? (
        <div className="sidebar-small-design">
          <NavLink
            to="/Dashboard"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  {/* <AiFillHome size={20} onClick={() => setSidebar(!sidebar)} /> */}
                  <AiFillDashboard size={20} />
                </span>

                <p>Dashboard</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/createpost"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <RiEditFill size={20} />
                </span>

                <p>CreatePost</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/Dashboardprofile"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <FaUserNurse size={20} />
                </span>

                <p>Profile</p>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/AddExperience"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <GiSkills size={20} />
                </span>

                <p>Experience</p>
              </div>
            </div>
          </NavLink>


          

          <NavLink
            to="/favourite"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <BsHeartFill size={20} />
                </span>

                <p>Favourite</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            to="/my-comments"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <MdQuestionAnswer size={20} />
                </span>

                <p>Comments</p>
              </div>
            </div>
          </NavLink>



          <NavLink
            to="/LogOut"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <AiOutlineLogout size={20} />
                </span>

                <p>LogOut</p>
              </div>
            </div>
          </NavLink>
        </div>
      ) : (
        <div className="sidebar">
          <NavLink
            to="/home"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-nav">
              {/* <AiFillHome size={20} onClick={() => setSidebar(!sidebar)} /> */}

              <li>
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
            <div className="sidebar-large-nav">
              <li>
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
            <div className="sidebar-large-nav">
              <li>
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
            <div className="sidebar-large-nav">
              <li>
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
            <div className="sidebar-large-nav">
              <li>
                <AiOutlineLogout size={15} /> Log Out
              </li>
            </div>
          </NavLink>
        </div>
      )}

      <NavMobileview />
    </div>
  );
};

export default Navwebview;
