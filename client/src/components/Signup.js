import React from "react";
import "../App.css";

function SignUp() {
  return (
    <div className="container">
      <div className="row">
        <div className="card design">
          <h1 className="toptest">Create Account</h1>
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                E-mail
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input type="text" className="form-control" />
            </div>
            <button type="submit" class="btn btn-primary btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
