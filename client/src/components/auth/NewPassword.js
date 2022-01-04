import axios from "axios";
import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import Dashboard from "../dashboard/All Posts/Dashboard";
import { signIn } from "./apiAuth";
import { UserContext } from "../UserContext";

import { SyncOutlined } from "@ant-design/icons";

function SignIn() {
  const history = useHistory();
  const [data, setData] = useState({
    password: "",
    error: "",
  });

  const [loading, setLoading] = useState(false);

  const { password, error } = data;
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

    fetch("/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setData({ ...data, error: result.error, success: false });
          setLoading(false);
        } else {
          setLoading(false);
          setData({
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => {
        console.console.log(err);
      });
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

  if (window.localStorage.getItem("tokenLogin")) {
    history.push("/Dashboard");
  }

  //useRef for focus on the input fields.

  const passworRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    passworRef.current.focus();
  }, []);

  const passwordKeyDown = (e) => {
    if (e.key === "Enter") {
      submitButtonRef.current.focus();
    }
  };

  // const buttonKeyDown = () => {};

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="form-design card">
              <form>
                <div className="text-center">
                  <img
                    src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-login-form/lotus.png"
                    style={{ width: "185px" }}
                    alt="logo"
                  />
                  <h5 className="text-center">Sign In To Your Account</h5>
                </div>
                {errorMessage()}

                <div className="form-group">
                  <input
                    type="password"
                    onKeyDown={passwordKeyDown}
                    ref={passworRef}
                    name="password"
                    value={password}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Type a new password*"
                  />
                </div>

                <div class="form-group justify-content-center align-items-center">
                  <button
                    type="submit"
                    // onKeyDown={buttonKeyDown}
                    ref={submitButtonRef}
                    name="btnSubmit"
                    className="btnContact"
                    value="Sign In"
                    onClick={(e) => {
                      submitData(e);
                    }}
                  >
                    {loading ? <SyncOutlined spin /> : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
