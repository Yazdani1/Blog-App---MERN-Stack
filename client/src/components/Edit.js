import React, { useState, useEffect } from "react";
import "../App.css";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

const Post = () => {
  const history = useHistory();

  const { id } = useParams();

  const [data, setData] = useState({
    title: "",
    des: "",
    error: null,
  });

  const { title, des, error } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const dataSubmit = async (e) => {
    e.preventDefault();
    const addItem = { title, des };
    try {
      setData({ ...data, error: null });
      await axios.put("/auth/update/" + id, addItem, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
        },
      });
      history.push("/myPost");
    } catch (err) {
      setData({ ...data, error: err.response.data.error });
    }
  };

  useEffect(() => {
    axios
      .get("/auth/edit/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then((result) => {
        setData(result.data);
      });
  }, []);

  //   const getMypost = () => {
  //     axios
  //       .get(`/auth/edit/${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //         },
  //       })

  //       .then((result) => {
  //         setData(result.data);

  //         console.log(result.data);
  //       });
  //   };

  //   useEffect(() => {
  //     getMypost();
  //   }, []);

  return (
    <div>
      <div className="container designdata card">
        <div className="row">
          <h1 className="toptest">Update Post</h1>
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea2">Description</label>
              <input
                class="form-control rounded-0"
                name="des"
                value={des}
                onChange={handleChange}
              />
            </div>
            {error ? <p className="text-danger">{error}</p> : null}
            <button
              type="submit"
              onClick={dataSubmit}
              class="btn btn-success custBtn"
            >
              Update post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Post;
