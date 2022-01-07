import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./Homepage.css";

const FirstSection = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <div className="container-fluid homepage-first">
        <div className="container first_section">
          <div className="row">
            <div className="col-md-12">
              <div class="top-left">
                <div className="first_Section_data">
                  <h5>Welcome to this Blog Site</h5>
                  <p>Learn from others and share your posts with others</p>
                  <h5>Become a member Today</h5>
                  <button className="btn btn-success">Sign Up?</button>
                  <h1>{user && user.name}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstSection;
