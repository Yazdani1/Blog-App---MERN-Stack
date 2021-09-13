import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Postaccouncement = () => {
  const history = useHistory();

  //get data from server

  const [getAnnounce, setAnnounce] = useState([]);

  const getAllannouncement = async () => {
    const result = await axios.get("/auth/getannouncement", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    setAnnounce(result.data);
  };

  useEffect(() => {
    getAllannouncement();
  });

  //delete announcement data

  //post data to the server

  const [data, setData] = useState({
    des: "",
    error: null,
  });

  const { des, error } = data;
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const submitData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/auth/announcement",
        { des, error },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
          },
        }
      );
      setData({ des: "" });
      history.push("/postannouncement");
    } catch (err) {
      setData({...data, error: err.response.data.error})
    }
  };
  function deletePost(id) {
    axios.delete("/auth/deleteannounce/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    getAllannouncement();
  }

  
  return (
    <div>
      <div className="container designdata card">
        <div className="row">
          <h1 className="toptest">Create Announcement</h1>
          <form>
            <div class="form-group green-border-focus">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea5"
                rows="3"
                onChange={handleChange}
                name="des"
                value={des}
              ></textarea>
            </div>
            {error ? <p className="text-danger">{error}</p> : null }
            <button
              type="submit"
              onClick={submitData}
              class="btn btn-success custBtn"
            >
              Publish Announcement
            </button>
          </form>
        </div>
      </div>


      <div className="container card announce_main">
        {getAnnounce.map((item) => (
          <div className="row">
            <div className="col-md-8 card announce_data">
              <p>{item.des}</p>

              <marquee width="100%" direction="left">
                <h5>Posted by: {item.postedBy.name}</h5>
              </marquee>
            </div>
            <div className="col-md-2 col-sm-12 card announce_data">
              <button
                type="submit"
                onClick={() => deletePost(item._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postaccouncement;
