import axios from "axios";
import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import Dashboard from "../dashboard/All Posts/Dashboard";
import { signIn } from "./apiAuth";
import { UserContext } from "../UserContext";

import { SyncOutlined } from "@ant-design/icons";

function NewPassword() {
  const history = useHistory();

  const { token } = useParams();
  console.log(token);
  const [data, setData] = useState({
    password: "",
    error: "",
    success: false,

  });

  const [loading, setLoading] = useState(false);

  const { password, error,success } = data;
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

    fetch("/auth/new-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setData({ ...data, error: result.error,success: false });
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

  const successMessage = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        You have changed you'r password. Sign in to your account.
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
                  <h5 className="text-center">Create You'r New Password</h5>
                </div>
                {errorMessage()}
                {successMessage()}

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
                    {loading ? <SyncOutlined spin /> : "Change Password"}
                  </button>
                </div>
                <div className="text-center">
                  <Link to={"/signin"}>
                    <p>Sign In to your account!</p>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NewPassword;
