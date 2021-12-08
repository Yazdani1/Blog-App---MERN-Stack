import React, { useEffect, useState, useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import "./favouritePost.css";

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
      {user &&
        user?.favourite?.map((item) => (
          <div className="fav-post-item">
            <h5>{item.title}</h5>
            <p>{ReactHtmlParser(item.des)}</p>
            
            <p>Likes-{item.likes?.length}</p>
            <p>Comments-{item.comments?.length}</p>
            
          </div>
        ))}
    </div>
  );
};
export default FavouritePost;
