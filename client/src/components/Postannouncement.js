import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import renderHTML from 'react-render-html';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Postaccouncement = () => {
  const history = useHistory();

  const [value, setValue] = useState("");

  //get data from server

  const [getAnnounce, setAnnounce] = useState([]);

  // const [data, setData] = useState({
  //   des: "",
  //   error: "",
  // });

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

  // const { des, error } = data;
  // const handleChange = (e) => {
  //   setData({
  //     ...data,
  //     error: false,
  //     //[e.target.name]: e.target.value,
  //     [name]: value,
  //   });
  // };

  const [des, setData] = useState("");
 
  // const handleChange = (e) => {
  //   setError("");
  //   setText(e.target.value);
  // };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/auth/announcement",
        { des },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
          },
        }
      );
 
      history.push("/postannouncement");
    } catch (err) {
      //setError({error: err.response.data.error });
    }
  setData("");
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
          {/* <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div> */}
          <h1 className="toptest">Create Announcement</h1>
          <form>
            <div class="form-group green-border-focus">
              <ReactQuill
                theme="snow"
                type="text"
                class="form-control"
                id="exampleFormControlTextarea5"
                rows="3"
                onChange={(e)=>setData(e)}
               // name="des"
                //onChange={handleChange}
                // value={value,des}
                value={des}
              />
            </div>
            {/* {error ? <p className="text-danger">{error}</p> : null} */}
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
              <p>{renderHTML(item.des)}</p>
              <marquee width="100%" direction="left">
                <h5>Posted by: {item.postedBy.name}</h5>
              </marquee>
            </div>
            <div className="col-md-3 card announce_data">
              <div className="row">
                <div className="col-md-6">
                  <button
                    type="submit"
                    onClick={() => deletePost(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    type="submit"
                    onClick={() => deletePost(item._id)}
                    className="btn btn-danger"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Postaccouncement;
