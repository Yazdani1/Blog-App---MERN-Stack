import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

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
    error: null,
  });
  const { email, password, error } = data;
  const handleChange = (e) => {
    setData({
      ...data,
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

      localStorage.setItem("tokenLogin", res.data.token);

      history.push("/myPost");
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
