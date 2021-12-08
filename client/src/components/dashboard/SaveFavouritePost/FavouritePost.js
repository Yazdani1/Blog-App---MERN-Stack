import React, { useEffect, useState, useContext } from "react";

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
    <div className="container card">
      {user &&
        user?.favourite?.map((item) => (
          <>
            <p>{item._id}</p>
            <p>{item.des}</p>
            <p>{item.title}</p>
          </>
        ))}
    </div>
  );
};
export default FavouritePost;
