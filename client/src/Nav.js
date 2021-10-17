import React, { useState, useEffect, useContext } from "react";
import "./App.css";
import axios from "axios";
import { UserContext } from "./components/UserContext";

import { Link, useHistory } from "react-router-dom";

function Nav() {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  // const [user, setUser] = useState("");
  // const getUser = async () => {
  //   const res = await axios.get("/auth", {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //     },
  //   });
  //   setUser(res.data);
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);

  // const history = useHistory();

  const logOut = async () => {
    await localStorage.removeItem("tokenLogin");
    history.push("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
          {localStorage.getItem("tokenLogin") ? (
            <>
              <Link to="/" className="eachitem">
                <li>Home</li>
              </Link>
              {/* <Link to={"/userprofile/" + user._id} className="eachitem">
                <li>{user && user.name}</li>
              </Link> */}

              <div className="eachitem">
                <li>{user && user.name}</li>
              </div>
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
                  <Link to="/myPost" className="dropdown-item each">
                    <li>My Post</li>
                  </Link>
                  <Link to="/postannouncement" className="dropdown-item each">
                    <li>Announcement</li>
                  </Link>

                  <Link to="/userprofile" className="dropdown-item each">
                    Dashboard
                  </Link>

                  <Link to="/profile" className="dropdown-item each">
                    Setting
                  </Link>

                  <Link
                    to={"/userprofile/" +(user && user._id)}
                    className="dropdown-item each item_back"
                  >
                    View Profile
                  </Link>
                  <hr />
                  <Link to="/signin" className="dropdown-item each">
                    <div onClick={logOut}>Sign Out</div>
                  </Link>
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

          {/* <a className="nav-item nav-link active" href="#">
            Home <span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link" href="#">
            Features
          </a>
          <a className="nav-item nav-link" href="#">
            Pricing
          </a> */}
        </div>
      </div>
    </nav>
  );
}
//nav updated
export default Nav;
