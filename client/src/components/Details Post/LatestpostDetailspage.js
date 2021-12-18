import React, { useState, useEffect, useContext } from "react";
import { getSimilarposts } from "./apidetailsPost";
import { UserContext } from "../UserContext";
import { addlikePost, addunlikePost } from "../HomePage/Apihomepage";
import { Spin } from "antd";
import { Link, useHistory, useParams } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";

const LatestpostDetailspage = () => {
  return (
    <div>
      <h1>Latest post details page</h1>
    </div>
  );
};
export default LatestpostDetailspage;
