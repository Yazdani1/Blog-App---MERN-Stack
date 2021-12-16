import React, { useState, useEffect, useContext } from "react";
import { getSimilarposts } from "./apidetailsPost";
import { UserContext } from "../UserContext";

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
