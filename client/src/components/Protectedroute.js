import React, { useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import Nav from "../Nav";
import Navbarwebviewfront from "./Navbarfrontside/Navbarwebviewfront";

function ProtectedRoute(props) {
  const history = useHistory();

  let Cmprops = props.procomp;

  // useEffect(() => {
  //   if (!localStorage.getItem("tokenLogin")) {
  //     history.push("/signin");
  //   } else {
  //     //history.push("/");
  //   }
  // }, []);
  return (
    <div>
      {/* <Nav /> */}
      <Navbarwebviewfront />
      <Cmprops />
    </div>
  );
}
export default ProtectedRoute;
