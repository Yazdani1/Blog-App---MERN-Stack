import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./auth.css";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import Dashboard from "../dashboard/All Posts/Dashboard";

function SignIn() {
  const notify = () => {
    toast.success("Signed In Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 9000,
    });
  };
  const notifyError = () => {
    toast.warn("Wrong Details", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 9000,
    });
  };
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: "",
 

  });
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
    try {
      setData({ ...data, error: null });
      const res = await axios.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log("rrrrrrrr"+res.data.user);
      // setState({ token: res.data.token, user: res.data.user });

      localStorage.setItem("tokenLogin", res.data.token);
      // localStorage.setItem("username", JSON.stringify(res.data.user));

      // window.localStorage.setItem("tokenLogin", JSON.stringify(res.data.token));

      history.push("/Dashboard");
    } catch (err) {
      setData({ ...data, error: err.response.data.error });
    }
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
      <div class="contact-form">
        <div class="contact-image">
          <img
            src="https://image.ibb.co/kUagtU/rocket_contact.png"
            alt="rocket_contact"
          />
        </div>
        <form>
          <h3>Create Your Account</h3>

          {errorMessage()}

          <div className="row">
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

            {/* <div class="col-md-6">
              <div>
                <img height="250px" width="500px" src="https://images.pexels.com/photos/4458/cup-mug-desk-office.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
              </div>
            </div> */}
            <div class="form-group">
              <input
                type="submit"
                name="btnSubmit"
                className="btnContact"
                value="Sign In"
                onClick={(e) => {
                  submitData(e);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
