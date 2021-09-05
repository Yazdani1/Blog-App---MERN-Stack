import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";

function SignIn() {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null
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
      setData({ ...data, error: null});
      const res = await axios.post(
        "/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem('tokenLogin',res.data.token);
      history.push("/");
    } catch (err) {
      setData({...data,error: err.response.data.error})
    }
  };

  return (
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
          {error ? <p className="text-danger">{error}</p>:null}
          <button
            type="submit"
            onClick={submitData}
            class="btn btn-primary custBtn"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignIn;
