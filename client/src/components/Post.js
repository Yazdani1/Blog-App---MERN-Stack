import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "./UserContext";
// const nodemailer = require("nodemailer");
// const sendgridTransport = require("nodemailer-sendgrid-transport");

// const mail = require("@sendgrid/mail");

// require("dotenv").config();
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
  const [error, setError] = useState(false);
  const [picerror, setpicError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [user, setUser] = useContext(UserContext);

  //to send email
  // const transporter = nodemailer.createTransport(
  //   sendgridTransport({
  //     auth: {
  //       api_key: process.env.API_SENDGRID,
  //     },
  //   })
  // );

  // mail.setApiKey(process.env.API_SENDGRID);


  useEffect(() => {
    if (url) {
      setError("");
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
            // setError(data.error);
          } else {
            setImageurl("");
            setUrl("");
            setError("");
            setSuccess(true);
            toast.success(
              "Post Created Successfully! " + (user && user.email),
              {
                position: toast.POSITION.TOP_RIGHT,
              }
            );
            // mail.send({
            //   to: "yaz4good@gmail.com",
            //   from: "yaz4noor@gmail.com",
            //   subject: "Post  Success",
            //   html: `<h1>Welcome to this blog site. You have Published a post
              
            //   <h5>Your Details</h5>
            
            //   </h1>`,
            // });
            //history.push("/Dashboard");
          }
        })
        .catch((err) => {
          console.log("Error is:" + err);
        });
      setTitle("");
      setDes("");
      setImageurl("");
      setUrl("");
    }
  }, [url]);
  const dataSubmit = (e) => {
    e.preventDefault();
    setError("");

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
        setImageurl("");
      })
      .catch((err) => {
        console.log(err);
      });
    setImageurl("");
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
            <p>{title ? title.length : 0}/100</p>
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
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default Post;
