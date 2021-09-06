import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";

function Nav() {
  //to show user name in the navbar

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await axios.get("/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const history = useHistory();
  const logOut = async () => {
    await localStorage.removeItem("tokenLogin");
    history.push("/signin");
  };

  return (
    <nav className="nav">
      <ul className="listItems">
        {localStorage.getItem("tokenLogin") ? (
          <>
            <Link to="/" className="eachitem">
              <li>Home</li>
            </Link>

            <Link to="/details" className="eachitem">
              <li>Details</li>
            </Link>

            <div className="dropdown show">
              <div
                className="dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user && user.name}
              </div>

              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link to="/post" className="dropdown-item each">
                  Create Post
                </Link>
                <Link to="/myPost" className="dropdown-item each">
                  <li>My Post</li>
                </Link>
                <Link to="/profile" className="dropdown-item each">
                  Profile
                </Link>

                <Link to="/profile" className="dropdown-item each">
                  Dashboard
                </Link>

                <Link to="/profile" className="dropdown-item each">
                  Setting
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
            <Link to="/" className="eachitem">
              <li>Home</li>
            </Link>
            <Link to="/signup" className="eachitem">
              <li>Sign Up</li>
            </Link>
            <Link to="/signin" className="eachitem">
              <li>Sign In</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
//nav updated
export default Nav;
