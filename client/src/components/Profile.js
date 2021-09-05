import React, { useState, useEffect } from "react";

import axios from "axios";

import { Link, useHistory } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await axios.get("/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    setUser(res.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
              <h3>{user && user.name}</h3>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
              <h3>{user && user.email}</h3>
          </div>
        </div>
        <div className="col-md-12">
          <div className="card">
              <h3>{user && user.createdAt}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
