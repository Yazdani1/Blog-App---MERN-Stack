import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";

const Userprofile = () => {
  const [mypost, setData] = useState([]);

  const { id } = useParams();

  const getMypost = () => {
    fetch(`/auth/userprofileda/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  };

  useEffect(() => {
    getMypost();
  }, []);

  return (
    <div className="card container main_container">
      <div className="row">
       
        <div className="col-md-8">
       
        </div>
      </div>
    </div>
  );
};
export default Userprofile;
