import React, { useState, useEffect } from "react";
import { getallPosts } from "./Apihomepage";

const AllpostSection = () => {
  const [posts, setPosts] = useState([]);

  const loadallPosts = () => {
    getallPosts()
      .then((data) => {
        if (data) {
          setPosts(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallPosts();
  }, []);

  return (
    <div className="container">
      <h1>Home Page all posts is here</h1>
    </div>
  );
};

export default AllpostSection;
