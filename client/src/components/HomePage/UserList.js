import React, { useEffect, useState } from "react";
import { getUserList } from "./Apihomepage";
import moment from "moment";
import { CgProfile } from "react-icons/cg";
import { Link, useHistory, useParams } from "react-router-dom";
import Pagination from "./Pagination";
import { BsCalendar2DateFill } from "react-icons/bs";

const UserList = () => {
  const [alluser, setAlluser] = useState([]);

  //for pagination state..

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentUsers = alluser.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(alluser.length / postsPerPage);

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
      <p className="latest-post-title">Visit Member Profile</p>

      <div className="row">
        {currentUsers.map((user, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
            <div className="user-infocard card">
              {user && user.photo ? (
                <div className="user-profile-picture-image">
                  <img src={user && user.photo} />

                  <p>{user.name}</p>
                </div>
              ) : (
                <div className="profile-pic-and-name">
                  <div className="user-profile-pic">
                    <p>{user && user.name.substring(0, 2).toUpperCase()}</p>
                  </div>
                  <p>{user.name}</p>
                </div>
              )}

              <p>{moment(user.createdAt).format("MMMM Do YYYY")}</p>
              <div className="view-profile-button">
                <Link to={"/userprofile/" + user._id}>
                  <span className="view-profile">View Profile</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="card">
        {alluser.length > 6 ? (
          <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
        ) : (
          "No Posts so far"
        )}
      </div>
    </div>
  );
};
export default UserList;
