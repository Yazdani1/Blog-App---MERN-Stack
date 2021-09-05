import React, { useState } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";


function SignUp() {
  const history = useHistory();

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
      setData({ ...data, error: null });
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
     

      <div className="containe design card">
        <div className="row">
          <h1 className="toptest">Create Account</h1>
          <form>
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
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            {error ? <p className="text-danger">{error}</p> : null}

            <button
              type="submit"
              onClick={dataSubmit}
              class="btn btn-success custBtn"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
