import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Slider from "react-slick";
import { BsArrowLeft } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
// import "../App.css";
import renderHTML from "react-render-html";
import ReactHtmlParser from "react-html-parser";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { UserContext } from "../UserContext";
import { AiFillLike } from "react-icons/ai";
import { addtoWishlist } from "../dashboard/SaveFavouritePost/ApiFavourite";
import SimilarPosts from "./SimilarPosts";
import LatestpostDetailspage from "./LatestpostDetailspage";
import { postFavourite } from "../dashboard/SaveFavouritePost/ApiFavourite";
import { getSimilarposts } from "./apidetailsPost";
import { getDetailsposts } from "./apidetailsPost";
import { addlikePost, addunlikePost } from "../HomePage/Apihomepage";
import { Spin } from "antd";
import "./details.css";
import { MdDelete } from "react-icons/md";
import Footer from "../Footer/footer";

const DetailsPage = () => {
  const { id } = useParams();

  const history = useHistory();

  const [dataItem, setData] = useState([]);
  const [latestPost, setLatestpost] = useState([]);
  const [postsmore, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useContext(UserContext);

  const loadDetailsposts = () => {
    getDetailsposts(id)
      .then((data) => {
        if (data) {
          setData(data.detailspost);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
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
        const newItemData = dataItem.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newItemData);
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
        const newItemData = dataItem.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newItemData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadDetailsposts();
  }, [dataItem]);

  const handleChange = (e) => {
    setError("");
    setText(e.target.value);
  };

  const postComment = (e, postId) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    fetch("/auth/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        text,
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          setError(result.error);
        } else {
          setError("");
          // setSuccess(true);
          toast.success("Your Comment has been posted!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        const newItemData = dataItem.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newItemData);
      })
      .catch((err) => {
        console.log(err);
      });
    setText("");
  };


  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Your Comment has been posted Successfully!
    </div>
  );

  const removeComment = (postId, text) => {
    fetch("/auth/remove-comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((result) => {
        if (result) {
          console.log("Comment removed");
          // getDetailsData();
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(postId, text);
  };

  // const addtoWishlist = (e, userID, postID) => {
  //   e.preventDefault();
  //   fetch("/auth/save-favouritepost", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //     },
  //     body: JSON.stringify({
  //       userID: userID,
  //       postID: postID,
  //     }),
  //   })
  //     .then((result) => {
  //       if (result) {
  //         console.log("Post Saved");
  //       }
  //       toast.success("This post has been Saved!", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   console.log(userID, postID);
  // };

  const loadAddtowishlist = (e, postID) => {
    e.preventDefault();
    addtoWishlist(postID)
      .then((data) => {
        if (data) {
          toast.success("This post has been Saved!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div class="text-center my-5">
        <h1>
          {/* <SyncOutlined spin /> */}
          <Spin size="large" />
        </h1>
      </div>
    );
  }

  return (
    <>
      <div className="main_details">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="details-post card">
                {/* <button onClick={() => history.goBack()}>Go Back</button> */}
                <img
                  src={dataItem && dataItem.photo}
                  height="300px"
                  alt="Post image"
                  className="det_posssst_image"
                  width="100%"
                />
                <div className="details-postDesign">
                  <div className="row">
                    <div className="col-lg-8 col-md-4 col-sm-12">
                      <Link
                        to={"/userprofile/" + dataItem.postedBy?._id}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <div className="profile-name-date">
                          <div className="profile-name-avatar">
                            <p>
                              {dataItem &&
                                dataItem.postedBy?.name
                                  .substring(0, 2)
                                  .toUpperCase()}
                            </p>
                          </div>
                          <div className="profile-name-post-date">
                            <p className="profile-name-size">
                              {dataItem && dataItem.postedBy?.name}
                            </p>
                            <p>
                              {moment(dataItem && dataItem.date).format(
                                "MMMM Do YYYY"
                              )}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="col-md-4">
                      <div className="details-post-likes">
                        <div className="like-buttondesign">
                          {dataItem &&
                          dataItem?.likes?.includes(user && user._id) ? (
                            <div
                              className="like-icon"
                              onClick={() => {
                                addunlikePost(dataItem._id);
                              }}
                            >
                              <AiFillLike size={20} />
                            </div>
                          ) : (
                            <div
                              className="like-icon"
                              onClick={() => {
                                if (!localStorage.getItem("tokenLogin")) {
                                  history.push("/signin");
                                } else {
                                  addlikePost(dataItem._id);
                                }
                              }}
                            >
                              <AiOutlineLike size={20} />
                            </div>
                          )}

                          <div className="like-count">
                            <p>{dataItem && dataItem.likes?.length}</p>
                          </div>
                        </div>

                        <div className="comment-buttondesign">
                          <div className="comment-icon">
                            <FaRegCommentDots size={20} />
                          </div>

                          <div className="comment-count">
                            <p> {dataItem.comments?.length}</p>
                          </div>
                        </div>
                        <div className="comment-buttondesign">
                          <div
                            className="comment-icon"
                            onClick={(e) => loadAddtowishlist(e, dataItem._id)}
                          >
                            <BsHeartFill size={20} />
                          </div>

                          <div className="comment-count">
                            <p
                              onClick={(e) =>
                                addtoWishlist(
                                  e,

                                  dataItem._id
                                )
                              }
                            >
                              Save
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="title-des">
                  <h5>{dataItem && dataItem.title}</h5>
                  <p>{ReactHtmlParser(dataItem.des)}</p>
                </div>
              </div>
              <div className="comments card">
                <form>
                  <div className="row">
                    <div className="col-lg-9 col-md-12 col-sm-12">
                      {showSuccess()}
                      {showError()}

                      <div className="form-groupgfgf">
                        <textarea
                          type="text"
                          className="form-control rounded-0"
                          onChange={handleChange}
                          value={text}
                          placeholder="Type your comments.."
                          rows="3.5"
                        />
                      </div>
                    </div>

                    <div class="col-lg-3 col-md-12 col-sm-12">
                      <div class="form-group">
                        <button
                          className="btn btn-success"
                          onClick={(e) => {
                            if (!localStorage.getItem("tokenLogin")) {
                              history.push("/signin");
                            } else {
                              postComment(e, dataItem._id);
                            }
                          }}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div
                  className="all-comments"
                  style={{ maxHeight: "800px", overflow: "scroll" }}
                >
                  <p>
                    {dataItem.comments?.length > 0
                      ? "Total Comments"
                      : "Total Comment"}
                    :{dataItem.comments?.length}{" "}
                  </p>
                  {dataItem.comments &&
                    [...dataItem.comments]
                      .reverse()
                      .map((allcomments, index) => {
                        return (
                          <>
                            <div className="comments-items" key={index}>
                              <Link
                                to={"/userprofile/" + allcomments.postedBy?._id}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <div className="profile-name-date">
                                  <div className="profile-name-avatar">
                                    <p>
                                      {allcomments.postedBy.name
                                        .substring(0, 2)
                                        .toUpperCase()}
                                    </p>
                                  </div>
                                  <div className="profile-name-post-date">
                                    <p className="profile-name-size">
                                      {allcomments.postedBy.name}
                                    </p>
                                    <p>
                                      {moment(
                                        allcomments && allcomments.date
                                      ).format("MMMM Do YYYY")}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                              <p>{allcomments.text}</p>
                              <p>
                                {user && user._id === allcomments.postedBy._id && (
                                  <div
                                    className="btn btn-danger"
                                    onClick={(e) =>
                                      removeComment(dataItem._id, allcomments)
                                    }
                                  >
                                    <MdDelete size={20} />
                                    Delete
                                  </div>
                                )}
                              </p>
                            </div>
                          </>
                        );
                      })}
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <LatestpostDetailspage />
            </div>
          </div>
        </div>

        <div className="container">
          <SimilarPosts />
        </div>
      </div>
      <ToastContainer autoClose={8000} />
      <Footer/>
    </>
  );
};
export default DetailsPage;
