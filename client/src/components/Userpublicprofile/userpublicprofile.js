import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import "../App.css";
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
import { ToastContainer, toast } from "react-toastify";
import "./userpublicprofile.css";
import { addlikePost, addunlikePost } from "../HomePage/Apihomepage";
import { UserContext } from "../UserContext";
import { AiFillLike } from "react-icons/ai";

// import { UserProfileContext } from "./UserprofileContext";

const UserPublicProfile = () => {
  const [mypost, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useContext(UserContext);

  // const [mypost, setData] = useContext(UserProfileContext);

  const { id } = useParams();
  const history = useHistory();

  //to send message

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendmessage = (e, userID) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    fetch("/auth/message", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        text,
        userID: userID,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          setError(result.error);
          toast.error(result.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setError("");
          setSuccess(true);
          toast.success("Your message has been sent!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setText("");
  };

  const getMypost = () => {
    axios
      .get(`/auth/userprofileda/${id}`)

      .then((result) => {
        setData(result.data);
        setLoading(false);

        console.log(result.data);
      });
  };

  const addlikePost = (id) => {
    fetch("/auth/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const newItemData = mypost.map((item) => {
            if (item._id === result._id) {
              return result;
            } else {
              return item;
            }
          });
          setData(newItemData);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addunlikePost = (id) => {
    fetch("/auth/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result) {
          const newItemData = mypost.map((item) => {
            if (item._id === result._id) {
              return result;
            } else {
              return item;
            }
          });
          setData(newItemData);
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const loadLikePost = (e,postId) => {
  //   e.preventDefault();
  //   addlikePost(postId).then((result) => {
  //     const newItemData = mypost.map((item) => {
  //       if (item._id == result._id) {
  //         return result;
  //       } else {
  //         return item;
  //       }
  //     });
  //     setData(newItemData);
  //   });
  // };

  //load unlike feature

  // const loadunLikePost = (e,postId) => {
  //   e.preventDefault();
  //   addunlikePost(postId).then((result) => {
  //     const newItemData = mypost?.map((item) => {
  //       if (item._id == result._id) {
  //         return result;
  //       } else {
  //         return item;
  //       }
  //     });
  //     setData(newItemData);
  //   });
  // };

  useEffect(() => {
    getMypost();
  }, [mypost]);

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
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card public-profile-items">
              <div className="profile-items_design">
                <MdCardMembership size={35} />
                <p>Member Since</p>
              </div>
              <p className="member-accountcreated-date">
                {moment(mypost?.userInfo?.createdAt).format("MMMM Do YYYY")}
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card public-profile-items">
              <div className="profile-items_design">
                <SiMicrodotblog size={35} />
                <p>Published Posts</p>
                <h4>{mypost?.postsData?.length}</h4>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card public-profile-items">
              <div className="profile-items_design">
                <FaUserGraduate size={35} />
                <p>Member Type</p>
                <p>
                  {" "}
                  {mypost?.postsData?.length >= 5 ? (
                    <p>Pro User</p>
                  ) : (
                    "New User"
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="card public-profile-items">
              <div className="profile-items_design">
                <p>
                  <AiFillMessage size={35} />
                </p>
                <button
                  className="btn btn-success"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Send Message <RiSendPlaneFill size={25} />
                </button>

                <div
                  className="modal fade"
                  id="exampleModalCenter"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">
                          Write your message
                        </h5>
                        <button
                          type="button"
                          className="btn btn-danger"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div class="form-group">
                            <label for="exampleFormControlTextarea2"></label>
                            <textarea
                              class="form-control rounded-0"
                              placeholder="Type your message.."
                              // value={about}
                              rows="8"
                              value={text}
                              onChange={(e) => setText(e.target.value)}
                              //value={experience}
                              //onChange={(e) => setExperience(e.target.value)}
                              // onChange={handleChange}
                              maxLength="150"
                              //   type="text"
                              //onChange={(e) => setAbout(e.target.value)}
                              // name="des"
                              //   onChange={handleChange}
                              //   value={about}
                            />
                            <p>{text ? text.length : 0} </p>
                          </div>
                          <button
                            type="submit"
                            class="btn btn-success custBtn"
                            onClick={(e) =>
                              sendmessage(e, mypost?.userInfo?._id)
                            }
                          >
                            SEND
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

              <div className="user-about-page">
                <p>{ReactHtmlParser(mypost?.userInfo?.about)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* user experience section */}

      {mypost?.userInfo?.experience ? (
        <div className="container card profile-about-container">
          <div className="row">
            <div className="col-md-12">
              <h5>Experience</h5>

              <div className="user-about-page">
                <p>{ReactHtmlParser(mypost?.userInfo?.experience)}</p>
              </div>
            </div>
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
            <div className="container">
              <div className="row">
                {mypost.postsData.map((item, index) => (
                  <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                    <div className="card main-card">
                      <img src={item.photo} className="favpurite-post-image" />
                      <div className="fav-post-text-item">
                        <div className="profile-name-date">
                          <div className="profile-name-avatar">
                            <p>
                              {item.postedBy.name.substring(0, 2).toUpperCase()}
                            </p>
                          </div>
                          <div className="profile-name-post-date">
                            <p className="profile-name-size">
                              {item.postedBy.name}
                            </p>
                            <p>{moment(item.date).format("MMMM Do YYYY")}</p>
                          </div>
                        </div>
                        <Link
                          to={"/details/" + item._id}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <p>{item.title}</p>
                        </Link>

                        <div className="like-comments">
                          <div className="like-button-design">
                            <div className="like-icons">
                              {item.likes.includes(user && user._id) ? (
                                <p
                                  onClick={() =>
                                    addunlikePost(item && item._id)
                                  }
                                >
                                  <AiFillLike size={20} />
                                </p>
                              ) : (
                                <p
                                  onClick={() => {
                                    if (!localStorage.getItem("tokenLogin")) {
                                      history.push("/signin");
                                    } else {
                                      addlikePost(item && item._id);
                                    }
                                  }}
                                >
                                  <AiOutlineLike size={20} />
                                </p>
                              )}
                            </div>
                            <p className="like-count">
                              {" "}
                              {item.likes?.length} likes
                            </p>
                          </div>

                          <div className="comment-button-design">
                            <div className="comment-icons">
                              <FaRegCommentDots size={17} />
                            </div>
                            <p className="comments-count">
                              {" "}
                              {item.comments?.length} comments
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </>
  );
};
export default UserPublicProfile;
