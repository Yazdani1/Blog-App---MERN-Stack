import React, { useState, useEffect, useContext } from "react";
import "../../../App.css";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import { UserContext } from "../../UserContext";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddExperience = () => {
  const [experience, setExperience] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const addExperience = (e, userID) => {
    e.preventDefault();
    fetch("/auth/add-experience", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        experience,
        userID: userID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setExperience(data.data);
          setSuccess(true);
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setExperience(user && user.experience);
  }, [user && user.experience]);

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Your have Successfully saved your changes!
    </div>
  );

  return (
    <div>
      <div className="container designdata card">
        <div className="row">
          <h5 className="toptest">Add Experience</h5>

          {showSuccess()}

          {JSON.stringify(experience)}

          <form>
            <div class="form-group">
              <label for="exampleFormControlTextarea2"></label>
              <textarea
                class="form-control rounded-0"
                placeholder="Add your experience.."
                // value={about}
                rows="8"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                // onChange={handleChange}
                //   theme="snow"
                //   type="text"
                //onChange={(e) => setAbout(e.target.value)}
                // name="des"
                //   onChange={handleChange}
                //   value={about}
              />
            </div>
            <button
              type="submit"
              onClick={(e) => addExperience(e, user && user._id)}
              class="btn btn-success custBtn"
            >
              Add Experience
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddExperience;
