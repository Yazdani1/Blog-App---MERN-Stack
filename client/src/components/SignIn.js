import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import Dashboard from "./dashboard/Dashboard";
import { UserGlobalContext } from "./UserGlobalContext";

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

 

  return (
    <div>
      {" "}
      <div className="containe design card">
        <div className="row">
          <h1 className="toptest">Sign In to your account</h1>
          <form>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="email"
                value={email}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="text"
                onChange={handleChange}
                name="password"
                value={password}
                className="form-control"
              />
            </div>
            {error ? <p className="text-danger">{error}</p> : null}
            <button
              type="submit"
              onClick={(e) => {
                submitData(e);
                
              }}
              class="btn btn-primary custBtn"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default SignIn;
