import React, { useState, useEffect, useContext } from "react";
import { getallPosts } from "./Apihomepage";
import { Spin } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { UserContext } from "../UserContext";
import { AiFillLike } from "react-icons/ai";
import { addlikePost, addunlikePost } from "./Apihomepage";
import Pagination from "./Pagination";

const AllpostSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useContext(UserContext);

  //for pagination state..number pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(posts.length / postsPerPage);

  const loadallPosts = () => {
    getallPosts()
      .then((data) => {
        if (data) {
          setPosts(data.resultGet);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //like feature

  const loadLikepost = (postId) => {
    addlikePost(postId).then((result) => {
      const newItemData = posts.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setPosts(newItemData);
    });
  };

  const loadunLikepost = (postId) => {
    addunlikePost(postId).then((result) => {
      const newItemData = posts.map((item) => {
        if (item._id == result._id) {
          return result;
        } else {
          return item;
        }
      });
      setPosts(newItemData);
    });
  };

  useEffect(() => {
    loadallPosts();
  }, []);

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
      <div className="row">
        {currentPosts.map((item, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
            <div className="card main-card">
              <img src={item.photo} className="favpurite-post-image" />
              <div className="fav-post-text-item">
                <Link
                  to={"/userprofile/" + item.postedBy._id}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="profile-name-date">
                    <div className="profile-name-avatar">
                      <p>{item.postedBy.name.substring(0, 2).toUpperCase()}</p>
                    </div>
                    <div className="profile-name-post-date">
                      <p className="profile-name-size">{item.postedBy.name}</p>
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
                        <p onClick={() => loadLikepost(item._id)}>
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
      {posts.length > 1 ? (
        <div className="card container">
          <Pagination pages={howManyPages} setCurrentPage={setCurrentPage} />
        </div>
      ) : null}
    </div>
  );
};

export default AllpostSection;
