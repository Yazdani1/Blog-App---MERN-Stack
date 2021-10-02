import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import Announcement from "./Announcement";

import { Link, useHistory } from "react-router-dom";

function Home() {
  const [dataItem, setData] = useState([]);
  const [latestPost, setLatestpost] = useState([]);

  useEffect(() => {
    axios.get("/auth/getpost").then((res) => {
      setData(res.data.resultGet);
      console.log(res.data);
    });

    axios.get("/auth/latestpost").then((res) => {
      setLatestpost(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div class="container">
      <div class="text-center my-5">
        <h1>Blog App</h1>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <div className="row">
              {dataItem.map((item) => (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="desing_home card mb-5 shadow-sm">
                  <h5>Published by:{item.postedBy.name}</h5>
                    <img src={item.photo}  className="images" />
                    <h4>{item.title}</h4>
                    <p>{item.des}</p>
                    <h5>
                      Published:{moment(item.date).format("MMMM Do YYYY")}
                    </h5>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-2 card userdetails">
            <h1>Hello Youttube</h1>
          </div>
        </div>
      </div>
    </div>

    // <div className="container">
    //   <div className="row">
    //     <div className="col-md-8">
    //       {dataItem.map((item) => (
    //         <div className="card top">
    //           <img src={item.photo} className="img-fluid"  height="200px"/>
    //           {/* <h3>{item.postedBy.name}</h3>
    //           <h3>{item.postedBy.email}</h3> */}
    //           <p>Published on:{moment(item.date).format("MMMM Do YYYY")}</p>
    //           <h5>{item.title}</h5>
    //           <p>{item.des.substring(0, 50)}</p>
    //           <Link to={"/userprofile/" + item.postedBy._id}>
    //             <p>Posted by: {item.postedBy.name}</p>
    //           </Link>
    //           <span className="read">Read More ...</span>
    //         </div>
    //       ))}
    //     </div>
    //     <div className="col-md-4">
    //       <h5 className="title lstestpostTitle">New Posts</h5>
    //       {latestPost.map((item) => (
    //         <div className="card latestPosts">
    //           <h5>{item.title}</h5>
    //           <p>{item.des.substring(0, 50)}</p>
    //           <p>Posted by: {item.postedBy.name}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
}
export default Home;
