import React from "react";
import "../App.css";
import { MdWifiTetheringErrorRounded } from "react-icons/md";
import { Link, useHistory, useParams } from "react-router-dom";

const PagenotFound = () => {
  return (
    <div className="container">
      <div className="page-not-found">
        <Link to="/">
          <button className="btn btn-primary">Back To Home</button>
        </Link>

        <h5 className="card noposts-design">
          <MdWifiTetheringErrorRounded size={300} />
          Page Not Found.404 Error <hr />
        </h5>
      </div>
    </div>
  );
};

export default PagenotFound;
