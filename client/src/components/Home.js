import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import { MdAccountBox } from "react-icons/md";
import { MdAssessment } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";



function Home() {
  const [dataItem, setData] = useState([]);
  const [latestPost, setLatestpost] = useState([]);

  const [user, setUser] = useState([]);

  const getUser = async () => {
    axios.get("/auth/allusers").then((res) => {
      setUser(res.data);
    });
  };

  useEffect(() => {
    axios.get("/auth/getpost").then((res) => {
      setData(res.data.resultGet);
      console.log(res.data);
    });

    axios.get("/auth/latestpost").then((res) => {
      setLatestpost(res.data);
      console.log(res.data);
    });

    getUser();
  }, []);

  return (
    <div class="dd">
      <div className="container first_section">
        <img
          src="https://images.pexels.com/photos/3194523/pexels-photo-3194523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          height="600px"
          width="100%"
        />
        
        <div class="top-left">
          <div className="card first_Section_data">
            <h5>Welcome to this Blog App</h5>
            <p>Learn from others and share your pots with others</p>
          </div>
        </div>
      </div>

      <div class="text-center my-5">{/* <h1>Blog App</h1> */}</div>

      <div className="second_section">
        <div className="row">
          <div className="col-md-6">
            <div className="items_ofhome">
              <h1>
                <MdAssessment />
              </h1>
              <h4>Published Post</h4>
              <h1>{dataItem.length}</h1>
            </div>
          </div>
          <div className="col-md-6">
            <div className="items_ofhome">
              <h1>
                <MdAccountBox />
              </h1>
              <h4>Active Users</h4>
              <h1>{user.length}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <div className="row">
              {dataItem.map((item) => (
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
                    <p>Read More</p>
                    {/* <span className="read_more_button">Read More</span> */}
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
  );

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
}
export default Home;
