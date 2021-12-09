import React, { useEffect, useState, useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import "./favouritePost.css";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";

import { getFavouritePost, removeFavouritePost } from "./ApiFavourite";
import { UserContext } from "../../UserContext";

const FavouritePost = () => {
  // const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useContext(UserContext);

  // const loadWishlist = () => {
  //   getFavouritePost().then((data) => {
  //     setWishlist(data);
  //     console.log(data);
  //   });
  // };

  const removePostfromWishlist = (e, userID, postID) => {
    e.preventDefault();
    fetch("/auth/remove-favouritepost", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        userID: userID,
        postID: postID,
      }),
    })
      .then((result) => {
        if (result) {
          console.log("Post Saved");
        }
        toast.success("This post has been removed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(userID, postID);
  };

  // useEffect(() => {
  //   loadWishlist();
  // }, []);

  return (
    <div className="container">
      <h5>Favourite Posts: {user && user?.favourite?.length}</h5>
      <p>{ReactHtmlParser(user && user?.favourite?._id)}</p>

      <div className="row">
        {user.favourite &&
          [...user?.favourite].reverse().map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
              <div className="card main-card">
                <img src={item.photo} className="favpurite-post-image" />
                <div className="fav-post-text-item">
                  <Link
                    to={"/details/" + item._id}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p>{item.title}</p>
                  </Link>
                  <p>{moment(item.date).format("MMMM Do YYYY")}</p>

                  <div className="like-comments">
                    <div className="like-button-design">
                      <p>Likes-{item.likes?.length}</p>
                    </div>

                    <div className="comment-button-design">
                      <p>
                        {" "}
                        <FaRegCommentDots size={15} /> comments-
                        {item.comments?.length}
                      </p>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={(e) =>
                      removePostfromWishlist(e, user && user._id, item._id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            // <div className="fav-post-item" key={index}>
            //   <Link to={"/details/" + item._id}>
            //     <h5>{item.title}</h5>
            //   </Link>
            //   <p>{ReactHtmlParser(item.des)}</p>

            //   <p>Likes-{item.likes?.length}</p>
            //   <p>Comments-{item.comments?.length}</p>
            //   <p>{moment(item.date).format("MMMM Do YYYY")}</p>

            //   <div className="comment-count">
            //     <button className="btn btn-danger"
            //       onClick={(e) =>
            //         removePostfromWishlist(e, user && user._id, item._id)
            //       }
            //     >
            //       Remove
            //     </button>
            //   </div>
            // </div>
          ))}
      </div>

      <ToastContainer autoClose={8000} />
    </div>
  );
};
export default FavouritePost;
