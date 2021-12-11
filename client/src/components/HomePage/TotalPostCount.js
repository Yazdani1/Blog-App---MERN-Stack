import React from "react";
import "./Homepage.css";
import { BsGraphUp } from "react-icons/bs";
import { FaUserSecret } from "react-icons/fa";
import { MdCardMembership } from "react-icons/md";

import { Link, useHistory, useParams } from "react-router-dom";

const Totalpostcount = ({ totalpost, totaluser }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="card home-post-count">
            <div className="profile-items_design">
              <p>Total Posts</p>
              <h4>
                <BsGraphUp size={25} />
              </h4>
              <p>{totalpost}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card home-post-count">
            <div className="profile-items_design">
              <p>Total Users</p>

              <p>
                <FaUserSecret size={25} />
              </p>

              <p>{totaluser}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 ">
          <div className="card home-post-count">
            <div className="profile-items_design">
              <p>Become a Mamber Today</p>
              <p>
                <MdCardMembership size={25} />
              </p>
              <Link to="/signup">
                <button className="btn btn-success">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Totalpostcount;
