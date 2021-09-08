import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import { Link, useHistory, useParams } from "react-router-dom";

const Userprofile = () => {
  const [mypost, setData] = useState([]);

  const { id } = useParams();

  const getMypost = async () => {
    await axios
      .get(`/auth/userprofileda/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })

      .then((result) => {
        setData(result.data);
        console.log(result);
      });
  };

  useEffect(() => {
    getMypost();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {mypost.map((item) => (
          <div className="col-md-3">
            <div className="userprofile card">
              <h4>{item.title}</h4>
              <p>{item.des}</p>
              <h5>Published:{moment(item.date).format("MMMM Do YYYY")}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Userprofile;
