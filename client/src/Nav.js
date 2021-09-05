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
    history.push("/signin");
    await localStorage.removeItem("tokenLogin");
  };

  const [dropdown, setDropdown] = useState(false);
  const toggleOpen = () => setDropdown(!dropdown);

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
            <Link to="/profile" className="eachitem">
              <li>Profile</li>
            </Link>
            <Link to="/post" className="eachitem">
              <li>Create Post</li>
            </Link>
            <li>{user && user.name}</li>
            <Link to="/signin" className="eachitem">
              <li type="submit" onClick={logOut}>
                Log Out
              </li>
            </Link>
          </>
        ) : (
          <>
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
