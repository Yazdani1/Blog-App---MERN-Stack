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
    email: "",
    password: "",
    error: "",
  });

  const [loading, setLoading] = useState(false);

  // const [state, setState] = useContext(UserContext);

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
          setData({ ...data, error: result.error });
          setLoading(false);
        } else {
          // setState({
          //   user: result.user,
          //   token: result.token,
          // });

          localStorage.setItem("tokenLogin", result.token);
          // window.localStorage.setItem("tokenLogin", JSON.stringify(result));

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

  if (window.localStorage.getItem("tokenLogin")) {
    history.push("/Dashboard");
  }

  //useRef for focus on the input fields.

  const emailRef = useRef(null);
  const passworRef = useRef(null);
  const submitButtonRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const emailKeyDown = (e) => {
    if (e.key === "Enter") {
      passworRef.current.focus();
    }
  };

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
                    type="text"
                    onKeyDown={emailKeyDown}
                    ref={emailRef}
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
                    onKeyDown={passwordKeyDown}
                    ref={passworRef}
                    name="password"
                    value={password}
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Password*"
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
                    {loading ? <SyncOutlined spin /> : "Sign In"}
                  </button>
                </div>
                <div className="text-center">
                  <Link to={"/reset"}>
                    <p>Forgot password?</p>
                  </Link>
                  <Link to={"/signup"}>
                    <p>Don't have an account? Create now</p>
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
export default SignIn;
