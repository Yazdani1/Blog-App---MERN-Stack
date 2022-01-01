import React, { useEffect, useState, useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import "./favouritePost.css";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

import { FcBullish } from "react-icons/fc";

import { removePostfromWishlist } from "./ApiFavourite";
import { UserContext } from "../../UserContext";

const FavouritePost = () => {
  const [user, setUser] = useContext(UserContext);

  const loadRemovefavouritepost = (e, userID, postID) => {
    e.preventDefault();
    removePostfromWishlist(userID, postID)
      .then((data) => {
        if (data) {
          toast.success("This post has been removed!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="container"
      style={{ maxHeight: "1000px", overflow: "scroll" }}
    >
      <h5>Favourite Posts: {user && user?.favourite?.length}</h5>

      <div className="row">
        {user.favourite &&
          [...user?.favourite].reverse().map((item, index) => (
            <div className="col-lg-6 col-md-6 col-sm-12 col-xl-4" key={index}>
              <div className="card main-card-favourite">
                <img src={item.photo} className="favpurite-post-image" />
                <div className="fav-post-text-item">
                  <Link
                    to={"/details/" + item._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p>{item.title.substring(0, 55)}</p>
                  </Link>
                  <p>{item && item.postedBy?.name}</p>

                  <p>{moment(item.date).format("MMMM Do YYYY")}</p>

                  <div className="like-comments">
                    <div className="like-button-design">
                      <div className="like-icons">
                        <p>
                          <AiFillLike size={20} />
                        </p>
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

                  {/* <div className="like-comments">
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
                  </div> */}

                  <button
                    className="btn btn-danger"
                    onClick={(e) =>
                      loadRemovefavouritepost(e, user && user._id, item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        {user && user?.favourite?.length === 0 ? (
          <h5 className="card noposts-design">
            <FcBullish size={300} />
            You dont't have Any Favourite Posts Yet!
          </h5>
        ) : null}
      </div>

      <ToastContainer autoClose={8000} />
    </div>
  );
};
export default FavouritePost;
