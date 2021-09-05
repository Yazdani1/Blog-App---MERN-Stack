import React, { useState, useEffect } from "react";
import axios from "axios";

function Home() {
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
    <div className="home">
      <h2>Home page {user && user.name}</h2>
      <h2>Home page {user && user.email}</h2>
      <h2>Home page {user && user.createdAt}</h2>

      <button
        type="submit"
        
        class="btn btn-danger custBtn"
      >
        Sign Up
      </button>
    </div>
  );
}
export default Home;
