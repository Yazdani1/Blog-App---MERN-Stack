import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import { Link, useHistory, useParams } from "react-router-dom";
import { MdCardMembership } from "react-icons/md";
import { SiMicrodotblog } from "react-icons/si";
import { AiFillMessage } from "react-icons/ai";
import { FaUserGraduate } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import { SyncOutlined } from "@ant-design/icons";
import { UserProfileContext } from "./UserprofileContext";

const Userprofile = () => {
  const [mypost, setData] = useState();
  const [loading, setLoading] = useState(true);

  // const [mypost, setData] = useContext(UserProfileContext);



  const { id } = useParams();

  const getMypost = () => {
    axios
      .get(`/auth/userprofileda/${id}`)

      .then((result) => {
        setData(result.data);
        setLoading(false);

        console.log(result.data);
      });
  };

  useEffect(() => {
    getMypost();
  }, []);

  if (loading) {
    return (
      <div class="text-center my-5">
        <h1>
          <SyncOutlined spin />
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="profile-pic-user-profile">
                <h2 className="user-profile-name-incircle">
                  {mypost?.userInfo?.name.substring(0, 2).toUpperCase()}
                </h2>
              </div>

              <div className="profile-pic-user-profile-name">
                <h2>{mypost?.userInfo?.name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container profile_items_container">
        <div className="row">
          <div className="col-md-3 card profile-items">
            <div className="profile-items_design">
              <MdCardMembership size={35} />
              <p>Member Since</p>
            </div>
            <p className="member-accountcreated-date">
              <GoCalendar />{" "}
              {moment(mypost?.userInfo?.createdAt).format("MMMM Do YYYY")}
            </p>
          </div>
          <div className="col-md-3 card profile-items">
            <div className="profile-items_design">
              <SiMicrodotblog size={35} />
              <p>Published Posts</p>
              <h4>{mypost?.postsData?.length}</h4>
            </div>
          </div>
          <div className="col-md-3 card profile-items">
            <div className="profile-items_design">
              <FaUserGraduate size={35} />
              <p>Member Type</p>
              <p>
                {" "}
                {mypost?.postsData?.length >= 5 ? <p>Pro User</p> : "New User"}
              </p>
            </div>
          </div>
          <div className="col-md-2 card profile-items">
            <div className="profile-items_design">
              <p>
                <AiFillMessage size={35} />
              </p>
              <button className="btn btn-success">
                Send Message <RiSendPlaneFill size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* user about section */}

      {mypost?.userInfo?.about ? (
        <div className="container card profile-about-container">
          <div className="row">
            <div className="col-md-12">
              <h5>About Me</h5>
              <hr />
              <div className="user-about-page">
                <p>{ReactHtmlParser(mypost?.userInfo?.about)}</p>
              </div>
            </div>
            {/* <div className="col-md-2 edit-button">
            <Link to={"/update-profile/" + (user && user._id)}>
              <h5>
                <AiFillEdit size={20} />
                Edit
              </h5>
            </Link> */}

            {/* <Link to={"/update-profile/" + (user && user._id)}>
            <button className="btn btn-danger">Edit</button>
          </Link> */}
            {/* </div> */}
          </div>
        </div>
      ) : null}

      {/* user experience section */}

      {mypost?.userInfo?.experience ? (
        <div className="container card profile-about-container">
          <div className="row">
            <div className="col-md-12">
              <h5>Experience</h5>
              <hr />
              <div className="user-about-page">
                <p>{ReactHtmlParser(mypost?.userInfo?.experience)}</p>
              </div>
            </div>
            {/* <div className="col-md-2 edit-button">
            <Link to={"/update-profile/" + (user && user._id)}>
              <h5>
                <AiFillEdit size={20} />
                Edit
              </h5>
            </Link> */}

            {/* <Link to={"/update-profile/" + (user && user._id)}>
            <button className="btn btn-danger">Edit</button>
          </Link> */}
            {/* </div> */}
          </div>
        </div>
      ) : null}

      <div className="container user-main-posts-section">
        <h5>
          {mypost?.postsData?.length === 0 ? (
            <div className="card">
              <h4>This User Did Not Publish Any Posts Yet</h4>
            </div>
          ) : (
            "All Posts"
          )}
        </h5>
        <div className="row">
          {mypost ? (
            <div className="col-md-12">
              <div className="row">
                {mypost.postsData.map((item) => (
                  <div className="col-md-3">
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
                        <GoCalendar />{" "}
                        {moment(item.date).format("MMMM Do YYYY")}
                      </p>
                      <h4>{item.title.substring(0, 15)}</h4>
                      <p>{ReactHtmlParser(item.des.substring(0, 20))}</p>
                      <hr />

                      <div className="likes">
                        <p>
                          <AiOutlineLike /> {item.likes.length}.
                          {item.likes.length > 0 ? "Likes" : "Like"}
                        </p>

                        <p>
                          <FaRegCommentDots /> {item.comments.length}
                        </p>
                        <p>
                          {item.comments.length > 0 ? "Comments" : "Comment"}
                        </p>
                      </div>
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

          {/* 
                      {mypost ? (
            <div className="col-md-3 user_profile_details">
              <div className="desing_home card mb-5 shadow-sm">
                {/* <div className="profile_pic">{mypost.userInfo.name.charAt(0)}</div> */}
          {/* <div className="user_profile_pic">
                  <h2>{mypost.userInfo.name.substring(0, 2)}</h2>
                </div>

                <h4>{mypost.userInfo.name}</h4>

                <p className="date_color">
                  Member Since:
                  {moment(mypost.userInfo.date).format("MMMM Do YYYY")}
                </p>

                <h4>Published posts: {mypost.postsData.length}</h4>
                <h4>Total Likes: {mypost.likes?.length}</h4>
                <h5>
                  {mypost.postsData.length >= 5 ? <p>Pro User</p> : "New User"}
                </h5>
                <p>{mypost.postsData.length === 0 ? "No posts" : null}</p>

              </div>
            </div> */}
          {/* ) : (

            <h1>Loading...</h1>
          )} */}
        </div>
      </div>
    </>
  );
};
export default Userprofile;
