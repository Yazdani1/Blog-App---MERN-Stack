import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import "./nav.css";
import axios from "axios";
import { UserContext } from "./components/UserContext";
import { Link, useHistory,NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";

function Nav() {
  const [user, setUserState] = useContext(UserContext);
  const history = useHistory();

  const logOut = () => {
    window.localStorage.removeItem("tokenLogin");
    setUserState(null);
    history.push("/signin");
  };

  return (
    <>
      <div className="header">
        <div className="menu-bar">
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
              <Link to="/">
                <a class="navbar-brand" href="#">
                  NeyFly
                </a>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="#navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <p>
                  <AiOutlineBars size={25} />
                </p>
                {/* <span className="navbar-toggler-icon"></span> */}
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                {window.localStorage.getItem("tokenLogin") ? (
                  <>
                    <ul class="navbar-nav ml-auto">
                      <Link to="/">
                        <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="#">
                            Home
                          </a>
                        </li>
                      </Link>
                      <Link to="/Dashboard">
                        <li class="nav-item">
                          <a class="nav-link" href="#">
                            Dashboard
                          </a>
                        </li>
                      </Link>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul class="navbar-nav ml-auto">
                      <Link to="/">
                        <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="#">
                            Home
                          </a>
                        </li>
                      </Link>
                      <Link to="/signup">
                        <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="#">
                            Sign Up
                          </a>
                        </li>
                      </Link>
                      <Link to="/signin">
                        <li class="nav-item">
                          <a class="nav-link" href="#">
                            Sign In
                          </a>
                        </li>
                      </Link>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          Blog App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {window.localStorage.getItem("tokenLogin") ? (
              <>
                <Link to="/" className="eachitem">
                  <li>Home</li>
                </Link>
                <Link to={"/userprofile/" + user._id} className="eachitem">
                <li>{user && user.name}</li>
              </Link>
                <div className="dropdown show eachitem">
                  <div
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    More
                  </div>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <Link to="/post" className="dropdown-item each">
                      Create Post
                    </Link>
                    <Link to="/Dashboard" className="dropdown-item each">
                      <li>My Post</li>
                    </Link>
                    <Link to="/postannouncement" className="dropdown-item each">
                      <li>Announcement</li>
                    </Link>

                    <Link to="/Dashboard" className="dropdown-item each">
                      Dashboard
                    </Link>
                    <Link to="/profile" className="dropdown-item each">
                      Profile
                    </Link>
                    <Link
                      target={"_blank"}
                      to={"/userprofile/" + (user && user._id)}
                      className="dropdown-item each item_back"
                    >
                      Public Profile
                    </Link>
                    <hr />
                    <Link to="/signin" className="dropdown-item each">
                      <div onClick={logOut}>Sign Out</div>
                    </Link>
                  </div>
                </div>
                <div className="eachitem">
                  <div className="user_info">
                    <div className="user_pic">
                      <Link
                        to={"/userprofile/" + (user && user._id)}
                        className="name_design"
                      >
                        <div className="user_pic_home_page">
                          <p>
                            {user && user.name.substring(0, 2).toUpperCase()}
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="user_name">
                      <p>{user ? user.name : "Loading"}</p>

                  
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="nav_design">
                  <Link to="/" className="eachitem">
                    <li>Home</li>
                  </Link>
                  <Link to="/signup" className="eachitem">
                    <li>Sign Up</li>
                  </Link>
                  <Link to="/signin" className="eachitem">
                    <li>Sign In</li>
                  </Link>
                </div>
              </>
            )}

      
          </div>
        </div>
      </nav> */}
    </>
  );
}
//nav updated
export default Nav;
