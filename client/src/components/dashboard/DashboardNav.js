import React, { useContext } from "react";
import Mypost from "../Mypost";
import "./DashboardNav.css";
import { AiFillDashboard } from "react-icons/ai";
import { RiEditFill } from "react-icons/ri";
import { FaUserNurse } from "react-icons/fa";
import { RiSettings2Fill } from "react-icons/ri";
import { GiSkills } from "react-icons/gi";
import { UserContext } from "../UserContext";
import { Link, useHistory } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiRamProfile } from "react-icons/gi";
import { MdQuestionAnswer } from "react-icons/md";

const DashboardNav = () => {
  const [userdetails, setUserdetails] = useContext(UserContext);

  const history = useHistory();

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    setUserdetails(null);
    history.push("/signin");
  };

  return (
    <div className="admin-nav-back">
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-12 col-xl-10">
          <div className="profile">
            {userdetails && userdetails.photo ? (
              <img
                src={userdetails && userdetails.photo}
                className="profile-picture-image"
              />
            ) : (
              <div className="profile-picture">
                <h4>
                  {userdetails &&
                    userdetails.name.substring(0, 2).toUpperCase()}
                </h4>
              </div>
            )}

            <h4 className="profile-name-navbar">
              {userdetails && userdetails.name}
            </h4>
          </div>

          <div className="adminnavbar">
            <Link to="/Dashboard" style={{ textDecoration: "none" }}>
              <li>
                <AiFillDashboard size={25} /> Dashboard
              </li>
            </Link>
            <Link to="/createpost" style={{ textDecoration: "none" }}>
              <li>
                <RiEditFill size={25} />
                Createpost
              </li>
            </Link>
            <Link to="/Dashboardprofile" style={{ textDecoration: "none" }}>
              <li>
                <FaUserNurse size={25} />
                Profile
              </li>
            </Link>
            <Link to="/AddExperience" style={{ textDecoration: "none" }}>
              <li>
                <GiSkills size={25} />
                Experience
              </li>
            </Link>
            <Link to="/favourite" style={{ textDecoration: "none" }}>
              <li>
                <BsHeartFill size={25} />
                Favourite
              </li>
            </Link>

            <Link to="/my-comments" style={{ textDecoration: "none" }}>
              <li>
                <MdQuestionAnswer size={25} />
                My Comments
              </li>
            </Link>

            <Link to="/message" style={{ textDecoration: "none" }}>
              <li>
                <AiFillMessage size={25} />
                Messages
              </li>
            </Link>

            <Link
              target={"_blank"}
              to={"/userprofile/" + (userdetails && userdetails._id)}
              style={{ textDecoration: "none" }}
            >
              <li>
                <GiRamProfile size={25} />
                Public Profile
              </li>
            </Link>

            <li className="logout" onClick={logOut}>
              <p>
                {" "}
                <RiLogoutCircleRLine size={20} />
                Log Out
              </p>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
