import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav className="nav">
      <ul className="listItems">
        <Link to="/" className="eachitem">
          <li>Home</li>
        </Link>

        <Link to="/signup" className="eachitem">
          <li>Sign Up</li>
        </Link>
        <Link to="/signin" className="eachitem">
          <li>Sign In</li>
        </Link>
        <Link to="/details" className="eachitem">
          <li>Details</li>
        </Link>
      </ul>
    </nav>
  );
}
//nav updated
export default Nav;