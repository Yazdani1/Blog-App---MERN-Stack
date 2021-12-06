import React, { useEffect, useState } from "react";
import { getUserList } from "./Apihomepage";
import moment from "moment";
import { CgProfile } from "react-icons/cg";
import { Link, useHistory, useParams } from "react-router-dom";

import { BsCalendar2DateFill } from "react-icons/bs";

const UserList = () => {
  const [alluser, setAlluser] = useState([]);

  const loadallUser = () => {
    getUserList()
      .then((data) => {
        setAlluser(data);
        console.log("Usr all list" + data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallUser();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {alluser.map((user, index) => (
          <div className="col-md-3">
            <div className="user-info">
              <div className="row">
                <div className="col-md-2">
                  <div className="userinfo-name-circle">
                    <p>{user && user.name.substring(0, 2).toUpperCase()}</p>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="user-fullname">
                    <h5>{user.name}</h5>

                    <p>{moment(user.createdAt).format("MMMM Do YYYY")}</p>
                    <Link to={"/userprofile/" + user._id}>
                      <span className="view-profile">View Profile</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserList;
