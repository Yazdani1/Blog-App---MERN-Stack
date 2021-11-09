import React from "react";
import "../App.css";
import { MdWifiTetheringErrorRounded } from "react-icons/md";

const PagenotFound = () => {
  return (
    <div className="container card">
      <div className="page-not-found">
          <h5><MdWifiTetheringErrorRounded size={300}/></h5>
        <h5>Page Not Found.404 Error  <hr/></h5>
       
      </div>
    </div>
  );
};

export default PagenotFound;
