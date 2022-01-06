import React, { useState } from "react";
import "./navheader.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Navwebview from "./Navwebview";

const Navheader = (props) => {
 
  return (
    <>
      <div className="nav-dashboard-headear">
        <li>
          <GiHamburgerMenu
            size={25}
            onClick={props.data}
          />
        </li>
        <ul>
          <li>Home</li>
          <li>Dashboard</li>
         
        </ul>

      </div>
    </>
  );
};

export default Navheader;
