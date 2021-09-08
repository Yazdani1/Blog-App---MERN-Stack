import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";

function Mypost() {
  const [mypost, setData] = useState([]);
  const [user, setUser] = useState(null);

  const getMypost = () => {
    axios
      .get("/auth/mypost", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  };

  const getUser = async () => {
    const res = await axios.get("/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    setUser(res.data);
  };

  useEffect(() => {
    getMypost();
    getUser();
  }, []);

  //delete data item

  function deletePost(id) {
    axios.delete("/auth/delete/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    getMypost();
  }

  function postTag(time) {
    var max = 36000;

    if (time >= max) {
      <h1>New</h1>;
    } else {
      <h2>Old</h2>;
    }
  }

  return (
    <div className="card container main_container">
      <div className="row">
        <div className="col-md-4">
          <div className="total_post">
            <h3>Total post</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="mamber_since">
            <h3>Member Since</h3>
            <p>{moment(user && user.createdAt).format("MMMM Do YYYY")}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="profile_visitor">
            <h3>Total post</h3>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          {mypost.map((item, index) => (
            <div className="card top">
              {/* <h3>{item.postedBy.name}</h3>
            <h3>{item.postedBy.email}</h3> */}
              <h1>{index}</h1>
              <h5>{item.title}</h5>
              <p>{item.des.substring(0, 50)}</p>
              <p>Published on:{moment(item.date).format("MMMM Do YYYY")}</p>
              <p>Posted by: {item.postedBy.name}</p>
              <span className="read">Read More ...</span>

              <div className="row">
                <div className="col-md-8">
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePost(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mypost;
