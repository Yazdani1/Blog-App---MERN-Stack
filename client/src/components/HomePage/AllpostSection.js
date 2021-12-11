import React, { useState, useEffect } from "react";
import { getallPosts } from "./Apihomepage";
import { Spin } from 'antd';

const AllpostSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadallPosts = () => {
    getallPosts()
      .then((data) => {
        if (data) {
          setPosts(data.resultGet);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //like feature

//   const addlikePost = (id) => {
//     fetch("/auth/like", {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
//       },
//       body: JSON.stringify({
//         postId: id,
//       }),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);

//         const newItemData = dataItem.map((item) => {
//           if (item._id == result._id) {
//             return result;
//           } else {
//             return item;
//           }
//         });
//         setData(newItemData);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

  //unlike feature

//   const addunlikePost = (id) => {
//     fetch("/auth/unlike", {
//       method: "put",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
//       },
//       body: JSON.stringify({
//         postId: id,
//       }),
//     })
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//         const newItemData = dataItem.map((item) => {
//           if (item._id == result._id) {
//             return result;
//           } else {
//             return item;
//           }
//         });
//         setData(newItemData);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };






  useEffect(() => {
    loadallPosts();
  }, []);


  if (loading) {
    return (
      <div class="text-center my-5">
        <h1>
          {/* <SyncOutlined spin /> */}
          <Spin  size="large"/>
        </h1>
      </div>
    );
  }



  return (
    <div className="container">
      <h1>{JSON.stringify(posts)}</h1>
    </div>
  );
};

export default AllpostSection;
