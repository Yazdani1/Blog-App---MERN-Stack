import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import "./auth.css";
import { signUp } from "./apiAuth";

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
    error: "",
    success: false,
  });

  const { name, email, password, success, error } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const dataSubmit = (e) => {
    e.preventDefault();
    setData({ ...data, error: false });

    signUp({ name, email, password }).then((result) => {
      if (result.errort) {
        setData({ ...data, error: result.errort, success: false });
      } else {
        setData({
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  // const dataSubmit = async (e) => {
  //   e.preventDefault();
  //   const addItem = { name, email, password };
  //   try {
  //     setData({ ...data, error: null }); //to get error
  //     await axios.post("/auth/register", addItem, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setData({
  //       name: "",
  //       email: "",
  //       password: "",
  //       error: "",
  //       success: true,
  //     });

  //     // history.push("/signin");
  //   } catch (err) {
  //     setData({ ...data, error: err.response.data.errort, success: false });
  //   }
  // };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        New account has created. Please Sign in to your account.
        <Link to="/signin">Sign In</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  return (
    <div className="container">
      <div class="contact-form container">
        <div class="contact-image">
          <img
            src="https://image.ibb.co/kUagtU/rocket_contact.png"
            alt="rocket_contact"
          />
        </div>
        <form>
          <h3>Create Your Account</h3>

          {successMessage()}
          {errorMessage()}

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name *"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Your E-mail *"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  value={password}
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Password*"
                />
              </div>
            </div>

            {/* <div class="col-md-6">
              <div>
                <img height="250px" width="500px" src="https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
              </div>
            </div> */}
            <div class="form-group">
              <input
                type="submit"
                name="btnSubmit"
                class="btnContact"
                value="Sign Up"
                onClick={(e) => {
                  dataSubmit(e);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
