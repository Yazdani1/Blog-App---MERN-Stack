import React, { useState, useEffect } from "react";
import "../../../App.css";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateProfile = () => {
  const history = useHistory();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [imageUrl, setImageurl] = useState("");
  const [url, setUrl] = useState("");

  // const [data, setData] = useState({
  //   name: "",
  //   email: "",
  //   about: "",
  // });

  // const [about, setAbout] = useState("");

  // const { name, email, about } = data;
  // const handleChange = (e) => {
  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const dataSubmit = async (e) => {
  //   e.preventDefault();
  //   const addItem = { name, email, about };
  //   try {
  //     //   setData({ ...data, error: null });
  //     await axios.put("/auth/update-profile-info/" + id, addItem, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //       },
  //     });

  //     history.push("/Dashboardprofile");
  //   } catch (err) {
  //     //   setData({ ...data, error: err.response.data.error });
  //   }
  // };

  useEffect(() => {
    if (url) {
      fetch("/auth/update-profile-info/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
        },
        body: JSON.stringify({
          name,
          email,
          about,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            history.push("/Dashboardprofile");
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
        setImageurl("");
      })
      .catch((err) => {
        console.log(err);
      });
    setImageurl("");
  };

  useEffect(() => {
    fetch("/auth/update-user-profile/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setName(data.name);
          setEmail(data.email);
          setAbout(data.about);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get("/auth/update-user-profile/" + id, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
    //     },
    //   })
    //   .then((result) => {
    //     setName(result.data.name);
    //     setEmail(result.data.email);
    //     setAbout(result.data.about);
    //     //setAbout(result.data.about);
    //   });
  }, []);

  return (
    <div>
      <div className="container designdata card">
        <div className="row">
          <h5 className="toptest">Update Profile</h5>

          <form>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label">
                User name
              </label>
              <input
                type="text"
                // name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea2">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea2">About</label>
              <textarea
                class="form-control rounded-0"
                // value={about}
                rows="3"
                // onChange={handleChange}
                theme="snow"
                type="text"
                //onChange={(e) => setAbout(e.target.value)}
                // name="des"
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                maxLength="250"
              />
              <p>{about ? about.length : 0}/250</p>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={(e) => setImageurl(e.target.files[0])}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              onClick={dataSubmit}
              class="btn btn-success custBtn"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
