import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";

const Userprofile = () => {
  const [mypost, setData] = useState();
  const { id } = useParams();
  
  const getMypost = () => {
    axios.get(`/auth/userprofileda/${id}`)
      
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
      {mypost ? (
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                {mypost.postsData.map((item) => (
                  <div className="col-md-4">
                    <div className="userprofile card">
                      <h4>{item.title}</h4>
                      <p>{item.des}</p>
                      <h5>
                        Published:{moment(item.date).format("MMMM Do YYYY")}
                      </h5>
                      <h5>Published by:{item.postedBy.name}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-md-3 card userdetails">
              <h1>{mypost.userInfo.name}</h1>
              <h5>{mypost.userInfo.email}</h5>
              <p>Total posts: {mypost.postsData.length}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};
export default Userprofile;
