import React from "react";
import AllPostList from "./AllPostList";

const Allpost = ({ posts }) => {
  return (
    <div>
      {posts ? (
        posts.map((item, index) => (
          <>
          
            <AllPostList
              photo={item.photo}
              title={item.title}
              des={item.des}
              index={index}
              ID={item._id}
             
            />
          </>
        ))
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
};
export default Allpost;
