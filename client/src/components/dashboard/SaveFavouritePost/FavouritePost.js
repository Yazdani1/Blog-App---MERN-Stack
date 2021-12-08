import React, { useEffect, useState, useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import "./favouritePost.css";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";

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

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <div className="container card fav-post">
      <h5>Favourite Posts: {user && user?.favourite?.length}</h5>
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
          </div>
        ))}
    </div>
  );
};
export default FavouritePost;
