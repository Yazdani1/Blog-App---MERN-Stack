import React, { useState, useEffect } from "react";
import { getSimilarposts } from "./apidetailsPost";

const SimilarPosts = () => {
  const [similarposts, setSimilarposts] = useState([]);

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
