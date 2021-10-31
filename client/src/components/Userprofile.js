import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useHistory, useParams } from "react-router-dom";

const Userprofile = () => {
  const [mypost, setData] = useState();
  const { id } = useParams();

  const getMypost = () => {
    axios
      .get(`/auth/userprofileda/${id}`)

      .then((result) => {
        setData(result.data);

        console.log(result.data);
      });
  };

  useEffect(() => {
    getMypost();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          {mypost ? (
            <div className="col-md-9">
              <div className="row">
                {mypost.postsData.map((item) => (
                  <div className="col-lg-4">
                    <div className="desing_home card mb-5 shadow-sm">
                      <div className="user_info">
                        <div className="user_pic">
                          <Link
                            to={"/userprofile/" + item.postedBy._id}
                            className="name_design"
                          >
                            <div className="user_pic_home_page">
                              <p>
                                {item.postedBy.name
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </p>
                            </div>
                          </Link>
                        </div>
                        <div className="user_name">
                          <Link
                            to={"/userprofile/" + item.postedBy._id}
                            className="name_design"
                          >
                            <p>{item.postedBy.name}</p>
                          </Link>
                        </div>
                      </div>
                      <img src={item.photo} className="images" />
                      <p className="date_color">
                        {moment(item.date).format("MMMM Do YYYY")}
                      </p>
                      <h4>{item.title.substring(0, 15)}</h4>
                      <p>{item.des.substring(0, 20)}</p>
                      <Link to={"/details/" + item._id}>
                        <button className="btn btn-primary">
                          Reade More <AiOutlineArrowRight />
                        </button>
                      </Link>

                      {/* <span className="read_more_button">Read More</span> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
          {mypost ? (
            <div className="col-md-3 user_profile_details">
              <div className="desing_home card mb-5 shadow-sm">
                {/* <div className="profile_pic">{mypost.userInfo.name.charAt(0)}</div> */}
                <div className="user_profile_pic">
                  <h2>{mypost.userInfo.name.substring(0, 2)}</h2>
                </div>

                <h4>{mypost.userInfo.name}</h4>

                <p className="date_color">
                  Member Since:
                  {moment(mypost.userInfo.date).format("MMMM Do YYYY")}
                </p>

                <h4>Published posts: {mypost.postsData.length}</h4>
                <h5>
                  {mypost.postsData.length >= 5 ? <p>Pro User</p> : "New User"}
                </h5>
                <p>{mypost.postsData.length === 0 ? "No posts" : null}</p>

                {/* <span className="read_more_button">Read More</span> */}
              </div>
            </div>
          ) : (
            // <div className="col-md-3 user_profile_details card ">
            //   <h1>{mypost.userInfo.name}</h1>
            //   <h5>{mypost.userInfo.email}</h5>
            //   <h4>Published posts: {mypost.postsData.length}</h4>
            // </div>
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
};
export default Userprofile;

BLACK_FRIDAY2021_YAZ