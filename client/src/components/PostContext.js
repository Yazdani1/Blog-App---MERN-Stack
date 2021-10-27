import React, { useState, useEffect, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [allPosts, setPosts] = useState([]);

  const getallPosts = async (props) => {
    await axios
      .get("/auth/getpost")
      .then((res) => {
        setPosts(res.data.resultGet);
      })
      .catch((err) => {
        console.log("Error is here"+err);
      });
  };
  useEffect(() => {
    getallPosts();
  }, []);

  return (
    <PostContext.Provider value={[allPosts, setPosts]}>
      {props.children}
    </PostContext.Provider>
  );
};
