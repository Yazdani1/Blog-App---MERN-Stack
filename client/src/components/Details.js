import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Slider from "react-slick";
import { BsArrowLeft } from "react-icons/bs";
import { GoCalendar } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import "../App.css";
import renderHTML from "react-render-html";
import ReactHtmlParser from "react-html-parser";
import { SyncOutlined } from "@ant-design/icons";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { BsHeartFill } from "react-icons/bs";
import { UserContext } from "./UserContext";
import { AiFillLike } from "react-icons/ai";

import { postFavourite } from "./dashboard/SaveFavouritePost/ApiFavourite";

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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getDetailsData = async () => {
    await axios
      .get("/auth/details/" + id)

      .then((result) => {
        setData(result.data.detailspost);
        console.log("Details post yaz" + result.data);
        history.go(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getlatestPost = async () => {
    await axios
      .get("/auth/latestpost")
      .then((res) => {
        setLatestpost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get other posts here

  const morePost = async () => {
    await axios
      .get("/auth/getpost")
      .then((res) => {
        setPosts(res.data.resultGet);
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

        // if (dataItem._id == result._id) {
        //   setData(result);
        // } else {
        //   return dataItem;
        // }

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

        // if (dataItem._id == result._id) {
        //   setData(result);
        // } else {
        //   return dataItem;
        // }

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
    getDetailsData();
    getlatestPost();
    morePost();
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

  //delete comment

  // const deleteComment = (postId, textId) => {

  //   fetch("/auth/deletecomments", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //     },
  //     body: JSON.stringify({
  //       text: textId,
  //       postId: postId,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       // console.log(result);
  //       // if (result.error) {
  //       //   setError(result.error);
  //       // } else {
  //       //   setError("");
  //       //   setSuccess(true);
  //       // }

  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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

  // const addtoFavourite = (e, userID) => {
  //   e.preventDefault();

  //   postFavourite(dataItem && dataItem._id, userID).then((res) => {
  //     console.log("Added to wish list", res);
  //     history.push("/Dashboard");
  //   });
  // };

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

  // const addtoWishlist = (userID, postID) => {
  //   fetch("/auth/save-favouritepost", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //     },
  //     body: JSON.stringify({
  //       userID:userID,
  //       postID:postID,
  //     }),
  //   })
  //     .then((result) => {
  //       if (result) {
  //         console.log("Post Saved");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   console.log(userID, postID);
  // };

  return (
    <>
      <div className="main_details">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
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
                    <div className="col-md-9">
                      <div className="details-post">
                        <div className="detailspage-user-profile">
                          <Link to={"/userprofile/"} className="name_design">
                            <div className="user_pic_home_page">
                              <p>
                                {dataItem &&
                                  dataItem.postedBy?.name
                                    .substring(0, 2)
                                    .toUpperCase()}
                              </p>
                            </div>
                          </Link>
                        </div>
                        <div className="detailspage-user-name">
                          <Link
                            to={"/userprofile/" + dataItem.postedBy?._id}
                            className="name_design"
                          >
                            <p>{dataItem && dataItem.postedBy?.name}</p>
                          </Link>
                          <p>
                            {moment(dataItem && dataItem.date).format(
                              "MMMM Do YYYY"
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
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
                            // <p
                            //   onClick={() => {
                            //     addunlikePost(dataItem._id);
                            //   }}
                            // >
                            //   <AiOutlineDislike size={20} />
                            // </p>
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
                        {/* <div className="comment-buttondesign">
                          <div className="comment-icon">
                            <BsHeartFill size={20} />
                          </div>

                          <div className="comment-count">
                            <button
                              className="btn btn-success"
                              onClick={(e) =>
                                addtoWishlist(e, user && user._id,dataItem._id)
                              }
                            >
                              {" "}
                              Save{" "}
                            </button>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="title-des">
                  <h5>{dataItem && dataItem.title}</h5>
                  {/* <h4>{dataItem && dataItem._id}</h4> */}

                  {/* {dataItem ? (
                    <p>{renderHTML(dataItem && dataItem.des)}</p>
                  ) : null} */}

                  <p>{ReactHtmlParser(dataItem.des)}</p>
                </div>
              </div>
              <div className="comments card">
                <form>
                  <div className="row">
                    <div className="col-md-9">
                      {/* <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                      >
                        Your Comment has been posted Successfully!
                      </div> */}
                      {showSuccess()}
                      {showError()}
                      {/* <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                      >
                        {error}
                      </div> */}
                      <div className="form-groupgfgf">
                        <textarea
                          type="text"
                          className="form-control rounded-0"
                          onChange={handleChange}
                          //onChange={(e) => setText(e.target.value)}
                          value={text}
                          placeholder="Type your comments.."
                          rows="3.5"
                        />
                        {/* {error ? <p className="text-danger">{error}</p> : null} */}
                      </div>
                    </div>
                    {/* <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                      >
                        {error}
                      </div> */}
                    <div class="col-md-3">
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

                          // onClick={(e) => postComment(e, dataItem._id)}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* style={{maxHeight:"1200px", overflow:"scroll"}} */}
                <div
                  className="all-comments"
                  style={{ maxHeight: "1200px", overflow: "scroll" }}
                >
                  <p>
                    {dataItem.comments?.length > 0
                      ? "Total Comments"
                      : "Total Comment"}
                    :{dataItem.comments?.length}{" "}
                  </p>
                  {dataItem.comments &&
                    [...dataItem.comments].reverse().map((allcomments,index) => {
                      return (
                        <>
                          <div className="each-comments" key={index}>
                            <div className="user_info">
                              <div className="user_pic">
                                <Link
                                  to={"/userprofile/"}
                                  className="name_design"
                                >
                                  <div className="user_pic_home_page">
                                    <p className="comment_Des">
                                      {allcomments.postedBy.name
                                        .substring(0, 2)
                                        .toUpperCase()}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                              <div className="user_name">
                                <Link
                                  to={
                                    "/userprofile/" + allcomments.postedBy?._id
                                  }
                                  className="name_design"
                                >
                                  <p>{allcomments.postedBy.name}.</p>
                                </Link>
                              </div>
                              <p>
                                {" "}
                                {moment(allcomments && allcomments.date).format(
                                  "MMMM Do YYYY"
                                )}
                              </p>

                              <p>
                                {user && user._id === allcomments.postedBy._id && (
                                  <div
                                    className="btn btn-danger"
                                    onClick={(e) =>
                                      removeComment(dataItem._id, allcomments)
                                    }
                                  >
                                    Delete
                                  </div>
                                )}
                              </p>

                              {/* <button
                                className="btn btn-danger"
                                onClick={() => deleteComment(allcomments.postedBy._id,allcomments.text)}
                              >
                                Delete
                              </button> */}
                            </div>
                            <p>{allcomments.text}</p>
                            {/* <p>{allcomments && allcomments._id}</p> */}
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="col-md-5">
              <h5 className="latest-posts-title card">Latest posts</h5>

              <div className="latest-post-positionsss card">
                {latestPost.map((item) => (
                  <div className="container">
                    <hr />

                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={item.photo}
                          height="100px"
                          alt="Post image"
                          className="det_post_image"
                          width="100%"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="latest_post">
                          <Link
                            className="latest_title"
                            to={"/details/" + item._id}
                          >
                            <h5>{item.title.substring(0, 25)}</h5>
                          </Link>
                          <p>
                            <FaUserCircle /> {item.postedBy.name}
                          </p>
                          <p>
                            <GoCalendar />{" "}
                            {moment(item.date).format("MMMM Do YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h5>View More posts</h5>
          <Slider {...settings}>
            {postsmore.map((item) => (
              <div className="col-md-12">
                <div className="desing_home card mb-5 shadow-sm">
                  <div className="user_info">
                    <div className="user_pic">
                      <Link
                        to={"/userprofile/" + item.postedBy._id}
                        className="name_design"
                      >
                        <div className="user_pic_home_page">
                          <p>
                            {item.postedBy.name.substring(0, 2).toUpperCase()}
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

                  <img src={item.photo} className="details_page_image" />
                  <p className="date_color">
                    <GoCalendar /> {moment(item.date).format("MMMM Do YYYY")}
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
          </Slider>
        </div>
      </div>
      <ToastContainer autoClose={8000} />

    </>
  );
};
export default DetailsPage;
