import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [error, setError] = useState(null);
  const [picerror, setpicError] = useState(null);
  const [success, setSuccess] = useState(false);

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
            setError(data.error);
          } else {
            setSuccess(true);
            //history.push("/Dashboard");
          }
        })
        .catch((err) => {
          console.log("Error is:" + err);
        });
    }
    setTitle("");
    setDes("");
    setImageurl("");
    setUrl("");
  }, [url]);
  const dataSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
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

  const showError = () => {
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>;
  };

  return (
    <div>
      <div className="container designdata card">
        <div className="row">
          <h1 className="toptest">Create Post</h1>
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Your post has been posted Successfully!
          </div>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
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
                maxLength="100"
              />
            </div>
            <p>{title? title.length:0}/100</p>
            <div class="form-group">
              <label for="exampleFormControlTextarea2">Description</label>
              <ReactQuill
                class="form-control rounded-0"
                value={des}
                onChange={(e) => setDes(e)}
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
