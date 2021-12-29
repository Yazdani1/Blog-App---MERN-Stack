import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Dashboard.css";
import moment from "moment";
import { MdCardMembership } from "react-icons/md";
import { MdAssessment } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { UserContext } from "../../UserContext";
import { ToastContainer, toast } from "react-toastify";
import renderHTML from "react-render-html";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import Allpost from "./Allpost";
import AllPostList from "./AllPostList";
import { SyncOutlined } from "@ant-design/icons";
import { Link, useHistory, useParams } from "react-router-dom";

import { SiMicrodotblog } from "react-icons/si";
import { AiFillMessage } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";

import { EyeOutlined } from "@ant-design/icons";

import { getMypost } from "./apiAllpost";
import { deletePost } from "./apiAllpost";

import Pagination from "../All Posts/../../HomePage/Pagination";
import "../All Posts/../../HomePage/Homepage.css";

function Dashboard() {
  const { id } = useParams();

  let iconStyles = { color: "white" };

  const [mypost, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //context api
  const [user, setUser] = useContext(UserContext);

  //for pagination state.. pagination for number

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = mypost.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(mypost.length / postsPerPage);

  const loadMypost = () => {
    getMypost().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(data.error);
      } else {
        setData(data.mypostdata);
        setLoading(false);
      }
    });
  };

  const deletemyPost = (id) => {
    deletePost(id)
      .then((data) => {
        if (data) {
          toast.info("Post Deleted Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          loadMypost();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getMypost = () => {
  //   fetch("/auth/mypost", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setData(result.mypostdata);
  //       setLoading(false);
  //       console.log(result);
  //     });
  // };

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    // getMypost();
    loadMypost();
  }, []);

  if (loading) {
    return (
      <div class="text-center my-25">
        <h1>
          <SyncOutlined spin />
        </h1>
      </div>
    );
  }

  //delete data item
  // function deletePost(id) {
  //   axios.delete("/auth/delete/" + id, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //     },
  //   });
  //   loadMypost();

  //   //getMypost();
  // }

  // function deletePost(id) {
  //   return fetch("/auth/delete/" + id, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //     },
  //   })
  //     .then((res) => res.json)
  //     .then((result) => {
  //       if (result) {
  //         loadMypost();
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   //getMypost();
  // }

  return (
    <>
      <div className="container profile_items_container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3 card public-profile-items">
            {/* <div className="card public-profile-items"> */}
            <div className="profile-items_design">
              <SiMicrodotblog size={35} />
              <p>Published Posts</p>
              <h4>{mypost.length}</h4>
            </div>
            {/* </div> */}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3 card public-profile-items">
            {/* <div className="card public-profile-items"> */}
            <div className="profile-items_design">
              <MdCardMembership size={35} />
              <p>Member Since</p>
              <p>{moment(user && user.createdAt).format("MMMM Do YYYY")}</p>
            </div>
            {/* </div> */}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3 card public-profile-items">
            {/* <div className="card public-profile-items"> */}
            <div className="profile-items_design">
              <FaUserGraduate size={35} />
              <p>Member Type</p>
              <p> {mypost.length >= 5 ? "Pro Account" : "Starter Account"}</p>
            </div>
            {/* </div> */}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3 card public-profile-items">
            {/* <div className="card public-profile-items"> */}
            <div className="profile-items_design">
              <AiFillMessage size={35} />

              <div className="profile-message">
                <h5>{user && user.message?.length}</h5>
                <Link to="/message">
                  <button className="btn btn-primary">View Messagees</button>
                </Link>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      {/* <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="total_posts card">
              <h1>
                <MdAssessment />
              </h1>
              <h3>Total post</h3>
              <h3>{mypost.length}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mamber_sinces card">
              <h1>
                <MdCardMembership />
              </h1>
              <h3>Member Since</h3>
              <p>{moment(user && user.createdAt).format("MMMM Do YYYY")}</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="mamber_sinces card">
              <h1>
                <MdCardMembership />
              </h1>
              <h3>Member Type</h3>
              <p>{mypost.length>=5? "Pro Account": "Starter Account"}</p>
            </div>
          </div>
      
        </div>
      </div> */}
      <div className="card container main_containers">
        {/* <Allpost posts={mypost} /> */}

        {/* table start */}

        {currentPosts.length > 0 ? (
          <div className="table-horizontal">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Photo</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th colspan="3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                </tr>

                {currentPosts.map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img src={item.photo} height="80px" width="80px"></img>
                    </td>
                    <td>{item.title.substring(0, 30)}</td>
                    <td>{ReactHtmlParser(item.des.substring(0, 80))}</td>
                    {/* to loops the post comment in the admin dashboard */}
                    {/* <td>{item.comments.map(c=>(
                      <h1>{c.text}</h1>
                    ))}</td> */}

                    <td>
                      <Link to={"/details/" + item._id}>
                        <button className="btn btn-primary">
                          <EyeOutlined style={{ fontSize: "20px" }} /> View
                        </button>
                      </Link>
                    </td>

                    <td>
                      <Link to={"/editpost/" + item._id}>
                        <button className="btn btn-success">
                          <AiTwotoneEdit size={20} />
                          Edit
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deletemyPost(item._id);
                        }}
                      >
                        <MdDelete size={20} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          "You Did no add any posts yet"
        )}

        <ToastContainer autoClose={8000} />

        {mypost.length > 1 ? (
          <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
        ) : null}
      </div>
    </>
  );
}

export default Dashboard;
