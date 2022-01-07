import React, { useState, useEffect, useContext } from "react";
import "../../../App.css";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import { UserContext } from "../../UserContext";
import { addexperience } from "./apiExperience";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddExperience = () => {
  const [experience, setExperience] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [success, setSuccess] = useState(false);

  const createExperience = (e, userID) => {
    e.preventDefault();
    addexperience({ experience, userID: userID })
      .then((data) => {
        if (data) {
          setExperience(data.data);
          setSuccess(true);
          toast.success("Your have Successfully saved your changes!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const addExperience = (e, userID) => {
  //   e.preventDefault();
  //   fetch("/auth/add-experience", {
  //     method: "put",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
  //     },
  //     body: JSON.stringify({
  //       experience,
  //       userID: userID,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data) {
  //         setExperience(data.data);
  //         setSuccess(true);
  //         toast.success("Your have Successfully saved your changes!", {
  //           position: toast.POSITION.TOP_RIGHT,
  //         });
  //       }
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
      <div className="container-fluid designdata card">
        <div className="experience-formdesign">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8 col-xl-8">
              <div className="cards">
                <h5 className="toptest">Add Experience</h5>

                {showSuccess()}

                {/* {JSON.stringify(experience)} */}

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
                      maxLength="150"
                      //   type="text"
                      //onChange={(e) => setAbout(e.target.value)}
                      // name="des"
                      //   onChange={handleChange}
                      //   value={about}
                    />
                    <p> {experience ? experience.length : 0}/150</p>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => createExperience(e, user && user._id)}
                    class="btn btn-success custBtn"
                  >
                    Add Experience
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={8000} />
    </div>
  );
};
export default AddExperience;
