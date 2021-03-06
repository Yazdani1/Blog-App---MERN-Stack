import React, { useState, useEffect, useContext } from "react";
import { getSimilarposts } from "./apidetailsPost";
import { UserContext } from "../UserContext";
import { addlikePost, addunlikePost } from "../HomePage/Apihomepage";
import { Link, useHistory, useParams } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { Spin } from "antd";

const SimilarPosts = () => {
  const [similarposts, setSimilarposts] = useState([]);

  //user context
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  //load similar posts
  const loadSimilarposts = () => {
    getSimilarposts().then((data) => {
      if (data) {
        setSimilarposts(data.moreposts);
        setLoading(false);
      }
    });
  };

  const history = useHistory();

  // load like api

  const loadLikePost = (postId) => {
    addlikePost(postId).then((result) => {
      const newItemData = similarposts.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setSimilarposts(newItemData);
    });
  };

  //load unlike feature

  const loadunLikePost = (postId) => {
    addunlikePost(postId).then((result) => {
      const newItemData = similarposts.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setSimilarposts(newItemData);
    });
  };

  useEffect(() => {
    loadSimilarposts();
  }, [similarposts]);

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
    <div className="container">
      <p className="latest-post-title">View More Posts</p>

      <div className="row">
        {similarposts?.map((item, index) => (
          <div className="col-lg-4 col-md-6 col-sm-6 col-xl-3" key={index}>
            <div className="card main-card">
              <div className="favpurite-post-image">
                <img src={item.photo} />

                {item.likes?.length >= 4 ? (
                  <p className="trending">Trending</p>
                ) : null}
              </div>
              {/* <img src={item.photo} className="favpurite-post-image" /> */}
              <div className="fav-post-text-item">
                <Link
                  to={"/userprofile/" + item.postedBy?._id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="profile-name-date">
                    {item.postedBy?.photo ? (
                      <div className="profile-name-avatar-image">
                        <img src={item.postedBy?.photo} />
                      </div>
                    ) : (
                      <div className="profile-name-avatar">
                        <p>
                          {item.postedBy?.name.substring(0, 2).toUpperCase()}
                        </p>
                      </div>
                    )}

                    <div className="profile-name-post-date">
                      <p className="profile-name-size">{item.postedBy?.name}</p>
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
                        <p onClick={() => loadunLikePost(item._id)}>
                          <AiFillLike size={20} />
                        </p>
                      ) : (
                        <p
                          onClick={() => {
                            if (!localStorage.getItem("tokenLogin")) {
                              history.push("/signin");
                            } else {
                              loadLikePost(item._id);
                            }
                          }}
                        >
                          <AiOutlineLike size={20} />
                        </p>
                      )}
                    </div>
                    <p className="like-count"> {item.likes?.length} likes</p>
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
        ))}
      </div>
    </div>
  );
};
export default SimilarPosts;
