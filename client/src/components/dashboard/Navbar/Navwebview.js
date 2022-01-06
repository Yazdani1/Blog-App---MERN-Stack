import React, { useState, useContext } from "react";
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
import { UserContext } from "../../UserContext";
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

  const [userdetails, setUserdetails] = useContext(UserContext);

  const history = useHistory();

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    setUserdetails(null);
    history.push("/signin");
  };

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
            to="/message"
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <AiFillMessage size={20} />
                </span>

                <p>Messages</p>
              </div>
            </div>
          </NavLink>

          <NavLink
            target={"_blank"}
            to={"/userprofile/" + (userdetails && userdetails._id)}
            style={{ textDecoration: "none" }}
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <div className="sidebar-item-back">
              <div className="sidebar-items">
                <span>
                  <GiRamProfile size={20} />
                </span>

                <p>Public Profile</p>
              </div>
            </div>
          </NavLink>

          <div className="sidebar-item-back">
            <div className="sidebar-items" onClick={logOut}>
              <span>
                <RiLogoutCircleRLine size={20} />
              </span>

              <p>Log Out</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="sidebar-large">
          <NavLink
            to="/Dashboard"
            style={{textDecoration: "none"}}
            className={({ isActive }) => (isActive ? "largenavactive" : "inactive")}
          >
            <div className="sidebar-large-navdesign">
            
              <p>
              <AiFillDashboard size={15} /> Dashboard
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/createpost"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <RiEditFill size={15} />
                Createpost
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/Dashboardprofile"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <FaUserNurse size={15} /> Profile
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/AddExperience"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <GiSkills size={15} /> Experience
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/favourite"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <BsHeartFill size={15} /> Favourite
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/my-comments"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <MdQuestionAnswer size={15} /> My Comments
              </p>
            </div>
          </NavLink>

          <NavLink
            to="/message"
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <AiFillMessage size={15} /> Messages
              </p>
            </div>
          </NavLink>

          <NavLink
            target={"_blank"}
            to={"/userprofile/" + (userdetails && userdetails._id)}
            style={{ textDecoration: "none" }}
            className={({ isActive }) =>
              isActive ? "largenavactive" : "inactive"
            }
          >
            <div className="sidebar-large-navdesign">
              <p>
                <GiRamProfile size={15} /> Public Profile
              </p>
            </div>
          </NavLink>

          <div className="sidebar-large-navdesign" onClick={logOut}>
            <p>
              <AiOutlineLogout size={15} /> Log Out
            </p>
          </div>
        </div>
      )}

      <NavMobileview />
    </div>
  );
};

export default Navwebview;
