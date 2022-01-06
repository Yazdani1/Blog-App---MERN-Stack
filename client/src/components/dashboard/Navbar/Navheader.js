import React, { useState } from "react";
import "./navheader.css";
import { GiHamburgerMenu } from "react-icons/gi";

const Navheader = () => {
  return (
    <>
      <div className="nav-dashboard-headear">
        <li>
          <GiHamburgerMenu size={25} />
        </li>
      </div>
    </>
  );
};

export default Navheader;
