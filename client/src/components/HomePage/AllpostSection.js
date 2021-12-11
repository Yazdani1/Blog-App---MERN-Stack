import React, { useState, useEffect } from "react";
import { getallPosts } from "./Apihomepage";
import { Spin } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";


const AllpostSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  //   const addlikePost = (id) => {
  //     fetch("/auth/like", {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //       },
  //       body: JSON.stringify({
  //         postId: id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);

  //         const newItemData = dataItem.map((item) => {
  //           if (item._id == result._id) {
  //             return result;
  //           } else {
  //             return item;
  //           }
  //         });
  //         setData(newItemData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

  //unlike feature

  //   const addunlikePost = (id) => {
  //     fetch("/auth/unlike", {
  //       method: "put",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //       },
  //       body: JSON.stringify({
  //         postId: id,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         const newItemData = dataItem.map((item) => {
  //           if (item._id == result._id) {
  //             return result;
  //           } else {
  //             return item;
  //           }
  //         });
  //         setData(newItemData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };

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
        {posts.map((item, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
            <div className="card main-card">
              <img src={item.photo} className="favpurite-post-image" />
              <div className="fav-post-text-item">
                <div className="profile-name-date">
                  <div className="profile-name-avatar">
                    <p>{item.postedBy.name.substring(0, 2).toUpperCase()}</p>
                  </div>
                  <div className="profile-name-post-date">
                    <p className="profile-name-size">{item.postedBy.name}</p>
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
                      <AiOutlineLike size={17} />
                    </div>
                    <p className="like-count"> {item.likes?.length} likes</p>
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
  );
};

export default AllpostSection;
