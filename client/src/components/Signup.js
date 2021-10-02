import React, { useState } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

function SignUp() {
  const history = useHistory();
  //react toast message

  const notify = () => {
    toast.success("Post Added Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
  });

  const { name, email, password, error } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const dataSubmit = async (e) => {
    e.preventDefault();
    const addItem = { name, email, password };
    try {
      setData({ ...data, error: null }); //to get error
      await axios.post("/auth/register", addItem, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      history.push("/signin");
    } catch (err) {
      setData({ ...data, error: err.response.data.errort });
    }
  };

  return (
    <div>
      <div class="container contact-form">
        <div class="contact-image">
          <img
            src="https://image.ibb.co/kUagtU/rocket_contact.png"
            alt="rocket_contact"
          />
        </div>
        <form method="post">
          <h3>Create Your Account</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  name="txtName"
                  class="form-control"
                  placeholder="Your Name *"
                  value=""
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="txtEmail"
                  class="form-control"
                  placeholder="Your Email *"
                  value=""
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="txtPhone"
                  class="form-control"
                  placeholder="Your Phone Number *"
                  value=""
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <input
                  type="text"
                  name="txtPhone"
                  class="form-control"
                  placeholder="Your Phone Number *"
                  value=""
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  name="txtPhone"
                  class="form-control"
                  placeholder="Your Phone Number *"
                  value=""
                />
              </div>
            </div>
            <div class="form-group">
              <input
                type="submit"
                name="btnSubmit"
                class="btnContact"
                value="Sign Up"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="container main_form">
        <div className="row">
          <h1 className="toptest">Create Account</h1>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
          <form className="card form_Design">
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            {/* {error ? <p className="text-danger">{error} Name </p> : null} */}
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            {/* {error ? <p className="text-danger">{error} E-mail</p> : null} */}
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={password}
                className="form-control"
                onChange={handleChange}
                className="inputfielddesign"
              />
            </div>

            {/* <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                Profile Picture
              </label>
              <input
                type="file"
                name="imgUrl"
                value={imgUrl}
                onChange={handleChange}
                className="form-control"
              />
            </div> */}
            {/* {error ? <p className="text-danger">{error} Password</p> : null} */}

            <button
              type="submit"
              onClick={(e) => {
                notify();
                dataSubmit(e);
              }}
              class="btn btn-success"
            >
              Sign Up
            </button>
          </form>
        </div>
        <ToastContainer autoClose={8000} />
      </div>
    </div>
  );
}
export default SignUp;
