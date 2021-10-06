import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
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
                      <Link
                        to={"/userprofile/" + item.postedBy._id}
                        className="name_design"
                      >
                        <p>Posted by: {item.postedBy.name}</p>
                      </Link>
                      <img src={item.photo} className="images" />
                      <p className="date_color">
                        Published on:{moment(item.date).format("MMMM Do YYYY")}
                      </p>
                      <h4>{item.title.substring(0, 15)}</h4>
                      <p>{item.des.substring(0, 20)}</p>
                      <Link to={"/details/" + item._id}>
                        <button className="btn btn-primary">Reade More</button>
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
                <div className="profile_pic">NA</div>

                <h4>{mypost.userInfo.name}</h4>

                <p className="date_color">
                  Member Since:
                  {moment(mypost.userInfo.date).format("MMMM Do YYYY")}
                </p>

                <h4>Published posts: {mypost.postsData.length}</h4>

             

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
