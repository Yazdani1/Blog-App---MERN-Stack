import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import Dashboard from "../dashboard/All Posts/Dashboard";
import { signIn } from "./apiAuth";

import { SyncOutlined } from "@ant-design/icons";

function SignIn() {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [loading, setLoading] = useState(false);

  const { email, password, error } = data;
  const handleChange = (e) => {
    setData({
      ...data,
      error: false,
      [e.target.name]: e.target.value,
    });
  };

  const submitData = async (e) => {
    e.preventDefault();
    setData({ ...data, error: false });

    setLoading(true);

    signIn({ email, password })
      .then((result) => {
        if (result.error) {
          setData({ ...data, error: result.error, success: false });
          setLoading(false);
        } else {
          localStorage.setItem("tokenLogin", result.token);

          history.push("/Dashboard");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const submitData = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setData({ ...data, error: null });
  //     const res = await axios.post(
  //       "/auth/login",
  //       { email, password },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     //console.log("rrrrrrrr"+res.data.user);
  //     // setState({ token: res.data.token, user: res.data.user });

  //     localStorage.setItem("tokenLogin", res.data.token);
  //     // localStorage.setItem("username", JSON.stringify(res.data.user));

  //     // window.localStorage.setItem("tokenLogin", JSON.stringify(res.data.token));

  //     history.push("/Dashboard");
  //   } catch (err) {
  //     setData({ ...data, error: err.response.data.error });
  //   }
  // };

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
    <>
      <div className="container main-container-for-form">
        <div class="contact-form container">
          <div class="contact-image">
            <img
              src="https://image.ibb.co/kUagtU/rocket_contact.png"
              alt="rocket_contact"
            />
          </div>
          <form>
            <h3>Create Your Account</h3>

            {errorMessage()}

            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-12">
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

   
              <div class="form-group">
                <button
                  type="submit"
                  name="btnSubmit"
                  className="btnContact"
                  value="Sign In"
                  onClick={(e) => {
                    submitData(e);
                  }}
                >
                  {loading ? <SyncOutlined spin /> : "Sign In"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.png"
                          style={{ width: "185px" }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The Lotus Team
                        </h4>
                      </div>

                      <form>
                        <p>Please login to your account</p>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Phone number or email address"
                          />
                          <label className="form-label" for="form2Example11">
                            Username
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                          />
                          <label className="form-label" for="form2Example22">
                            Password
                          </label>
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                          >
                            Log in
                          </button>
                          <a className="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">We are more than just a company</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default SignIn;
