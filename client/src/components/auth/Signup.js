import React, { useRef, useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import "./auth.css";
import { signUp } from "./apiAuth";
import { SyncOutlined } from "@ant-design/icons";

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

  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    signUp({ name, email, password }).then((result) => {
      if (result.errort) {
        toast.error(result.errort, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setData({ ...data, error: result.errort, success: false });
        setLoading(false);
      } else {
        toast.success("Your account has Created Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
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

  if (window.localStorage.getItem("tokenLogin")) {
    history.push("/Dashboard");
  }


    //useRef for focus on the input fields.

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passworRef = useRef(null);
    const submitButtonRef = useRef(null);
  
    useEffect(() => {
      nameRef.current.focus();
    }, []);

    const nameKeyDown = (e) => {
      if (e.key === "Enter") {
        emailRef.current.focus();
      }
    };

  
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



  return (
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
                <h5 className="text-center">Create Your Account</h5>
              </div>
              {errorMessage()}
              {successMessage()}
              <div className="form-group">
                <input
                  type="text"
                  onKeyDown={nameKeyDown}
                  ref={nameRef}
                 
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
                  ref={submitButtonRef}
                  name="btnSubmit"
                  className="btnContact"
                  value="Sign In"
                  onClick={(e) => {
                    dataSubmit(e);
                  }}
                >
                  {loading ? <SyncOutlined spin /> : "Sign Up"}
                </button>
              </div>
              <div className="text-center">
                <Link to={"/signin"}>
                  <p>Already have an account? Sign In</p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
}
export default SignUp;
