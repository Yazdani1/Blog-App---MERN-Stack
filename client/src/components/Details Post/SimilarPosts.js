import React, { useState, useEffect, useContext } from "react";
import { getSimilarposts } from "./apidetailsPost";
import { UserContext } from "../UserContext";
import { addlikePost, addunlikePost } from "../HomePage/Apihomepage";

const SimilarPosts = () => {
  const [similarposts, setSimilarposts] = useState([]);

  //user context
  const [user, setUser] = useContext(UserContext);

  //load similar posts
  const loadSimilarposts = () => {
    getSimilarposts().then((data) => {
      if (data) {
        setSimilarposts(data);
      }
    });
  };

  // load like api

  const loadLike = (postId) => {
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

  useEffect(() => {
    loadSimilarposts();
  }, []);

  return (
    <div>
      <h1>Similar Posts section</h1>
    </div>
  );
};
export default SimilarPosts;
