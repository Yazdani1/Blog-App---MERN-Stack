import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from 'moment';
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
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          {dataItem.map((item) => (
            <div className="card top">
              {/* <h3>{item.postedBy.name}</h3>
              <h3>{item.postedBy.email}</h3> */}
              <p>Published on:{moment(item.date).format('MMMM Do YYYY')}</p>
              <h5>{item.title}</h5>
              <p>{item.des.substring(0, 50)}</p>
              <Link to={"/userprofile/"+item.postedBy._id}>
              <p>Posted by: {item.postedBy.name}</p>
              </Link>
              
              <span className="read">Read More ...</span>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <h5 className="title lstestpostTitle">New Posts</h5>
          {latestPost.map((item) => (
            <div className="card latestPosts">
              <h5>{item.title}</h5>
              <p>{item.des.substring(0, 50)}</p>
              <p>Posted by: {item.postedBy.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
