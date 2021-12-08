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
          <>
            <p>{item._id}</p>
            <p>{ReactHtmlParser(item.des)}</p>
            <p>{item.title}</p>
            <p>Likes-{item.likes?.length}</p>
            <p>Comments-{item.comments?.length}</p>
            
          </>
        ))}
    </div>
  );
};
export default FavouritePost;
