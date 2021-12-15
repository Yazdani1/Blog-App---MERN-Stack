import React, { useState, useEffect, useContext } from "react";
import { Spin } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { UserContext } from "../UserContext";
import { AiFillLike } from "react-icons/ai";
import { addlikePost, addunlikePost } from "./Apihomepage";
import { latestPost } from "./Apihomepage";
import Slider from "react-slick";

const LatestPost = () => {
  const [latestpost, setLatestpost] = useState([]);
  const [user, setUser] = useContext(UserContext);

  const history = useHistory();


  const loadLatestpost = () => {
    latestPost()
      .then((data) => {
        setLatestpost(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadLikepost = (postId) => {
    addlikePost(postId).then((result) => {
      const newItemData = latestpost.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setLatestpost(newItemData);
    });
  };

  const loadunLikepost = (postId) => {
    addunlikePost(postId).then((result) => {
      const newItemData = latestpost.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setLatestpost(newItemData);
    });
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    adaptiveHeight: true,
    initialSlide: 0,
    autoplay: true,
    rows: 2,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  useEffect(() => {
    loadLatestpost();
  }, []);

  return (
    <div className="container">
      <p className="latest-post-title">Latest Post</p>
      <div className="row">
        <Slider {...settings}>
          {latestpost.map((item, index) => (
            <div className="col-lg-12 col-md-12 col-sm-12" key={index}>
              <div className="card main-card-latest-post">
                <div className="row">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="card latest-post-image">
                      <img src={item.photo} height="178px" />
                    </div>
                  </div>

                  <div className="col-lg-8 col-md-12 col-sm-12 ">
                    <div className="latest-post-text-item">
                      <Link
                        to={"/userprofile/" + item.postedBy._id}
                        style={{ textDecoration: "none", color: "black" }}
                      >
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
                      </Link>
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
                              <p onClick={() => loadunLikepost(item._id)}>
                                <AiFillLike size={20} />
                              </p>
                            ) : (
                              <p
                                onClick={() => {
                                  if (!localStorage.getItem("tokenLogin")) {
                                    history.push("/signin");
                                  } else {
                                    loadLikepost(item._id);
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
                            <FaRegCommentDots size={20} />
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
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default LatestPost;
