import React, { useState, useEffect, useContext } from "react";
import "../App.css";
import FirstSection from "./HomePage/FirstSection";
import AllUserList from "./HomePage/UserList";
import "./css/home-mainpost.css";
import "./HomePage/Homepage.css";
import Footer from "./Footer/footer";
import AllpostSection from "./HomePage/AllpostSection";
import LatestPost from "./HomePage/LatestPost";
import Totalpostcount from "./HomePage/TotalPostCount";

const Home = () => {
  return (
    <div>
      <FirstSection />
      <Totalpostcount />
      <LatestPost />
      <AllpostSection />

      <AllUserList />
      <Footer />
    </div>
  );
};

export default Home;
