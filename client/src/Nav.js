import React from "react";
import "./App.css";

import { Link, useHistory } from "react-router-dom";

function Nav() {
  const history = useHistory();
  const logOut = async () => {
    history.push("/signin");
    await localStorage.removeItem("tokenLogin");
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
