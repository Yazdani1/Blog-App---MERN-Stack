import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import "./Homepage.css";
import { Link } from "react-router-dom";

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
                  <h5>Welcome to This Multi-User Blog Platform</h5>
                  <p>Learn from others and share your posts</p>
                  {!window.localStorage.getItem("tokenLogin") ? (
                    <>
                      <h5>
                        Become a member today and start sharing your posts
                      </h5>
                      <Link to={"/signup"}>
                        <span className="create-account">Create your account</span>
                      </Link>
                    </>
                  ) : (
                    <Link to="/Dashboard">
                      <button className="btn btn-primary">
                        Publish Your Post
                      </button>
                    </Link>
                  )}
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
