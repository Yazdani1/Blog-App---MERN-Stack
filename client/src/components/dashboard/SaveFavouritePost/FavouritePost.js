import React, { useEffect, useState, useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import "./favouritePost.css";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { getFavouritePost, removeFavouritePost } from "./ApiFavourite";
import { UserContext } from "../../UserContext";

const FavouritePost = () => {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useContext(UserContext);

  const loadWishlist = () => {
    getFavouritePost().then((data) => {
      setWishlist(data);
      console.log(data);
    });
  };

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

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div className="container card fav-post">
      <h5>Favourite Posts: {user && user?.favourite?.length}</h5>
      <p>{ReactHtmlParser(user && user?.favourite?._id)}</p>

      {user.favourite &&
        [...user?.favourite].reverse().map((item, index) => (
          <div className="fav-post-item" key={index}>
            <Link to={"/details/" + item._id}>
              <h5>{item.title}</h5>
            </Link>
            <p>{ReactHtmlParser(item.des)}</p>

            <p>Likes-{item.likes?.length}</p>
            <p>Comments-{item.comments?.length}</p>
            <p>{moment(item.date).format("MMMM Do YYYY")}</p>

            

            <div className="comment-count">
              <button className="btn btn-danger"
                onClick={(e) =>
                  removePostfromWishlist(e, user && user._id, item._id)
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      <ToastContainer autoClose={8000} />
    </div>
  );
};
export default FavouritePost;
