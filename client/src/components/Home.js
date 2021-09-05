import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../Nav";

import { Link, useHistory } from "react-router-dom";

function Home() {
  const [user, setUser] = useState(null);
  const history = useHistory();

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

  // const logOut = () => {
  //   localStorage.removeItem('tokenLogin');
  //   history.push("/signin");
  // };

  return (
    <div className="home">
      {user ? (
        <div>
          <h2>Home page {user && user.name}</h2>
          <h2>Home page {user && user.email}</h2>
          <h2>Home page {user && user.createdAt}</h2>
        </div>
      ) : (
        <center>
          {" "}
          <h1>Loading.....</h1>
        </center>
      )}

      {/* 
      <button type="submit" onClick={logOut} class="btn btn-danger custBtn">
        Log Out
      </button> */}
    </div>
  );
}
export default Home;
