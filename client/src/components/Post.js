import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

const Post = () => {
  const history = useHistory();

  // const [data, setData] = useState({
  //   title: "",
  //   des: "",
  //   error: null,
  //   imgUrl: ""
  // });

  // const { title, des, error,imgUrl} = data;

  // const handleChange = (e) => {
  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  //image upload

  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [imageUrl, setImageurl] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      fetch("/auth/post", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
        },
        body: JSON.stringify({
          title,
          des,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            console.log("Got some error");
          } else {
            history.push("/myPost");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);

  const dataSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("file", imageUrl);
    data.append("upload_preset", "blog-app");
    data.append("cloud_name", "yaz");

    fetch("https://api.cloudinary.com/v1_1/yaz/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // history.push("/myPost");
    // const addItem = { title, des };
    // try {
    //   setData({ ...data, error: null });
    //   await axios.post("/auth/post", addItem, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    //     },
    //   });
    //   history.push("/myPost");
    // } catch (err) {
    //   setData({ ...data, error: err.response.data.error });
    // }
  };

  return (
    <div>
      <div className="container designdata card">
        <div className="row">
          <h1 className="toptest">Create Post</h1>
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea2">Description</label>
              <input
                type="text"
                class="form-control rounded-0"
                value={des}
                onChange={(e) => setDes(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                Upload Picture
              </label>
              <input
                type="file"
                onChange={(e) => setImageurl(e.target.files[0])}
                className="form-control"
              />
            </div>
            {/* {error ? <p className="text-danger">{error}</p> : null} */}
            <button
              type="submit"
              onClick={dataSubmit}
              class="btn btn-success custBtn"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Post;
