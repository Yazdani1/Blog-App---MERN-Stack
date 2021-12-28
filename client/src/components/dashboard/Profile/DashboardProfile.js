import React, { useState, useContext } from "react";
import "./dashboard-profile.css";
import { UserContext } from "../../UserContext";
import { Link, useHistory } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import ReactHtmlParser from "react-html-parser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { options } from "nodemon/lib/config";

const DashboardProfile = () => {
  const [user, setUser] = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(null);

  const [prolanguage, setProlanguage] = useState("");

  return (
    <>
      <div className="container card profile-main-container">
        <div className="row">
          <div className="col-md-10">
            <div className="profile-name">
              <div className="profile-avatar">
                <p>{user && user.name.substring(0, 2).toUpperCase()}</p>
              </div>
              <div className="profile-user-name">
                <p>{user && user.name}</p>
                <p>{user && user.email}</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 edit-button">
            <Link to={"/update-profile/" + (user && user._id)}>
              <h5>
                <AiFillEdit size={20} />
                Edit
              </h5>
            </Link>

            {/* <Link to={"/update-profile/" + (user && user._id)}>
            <button className="btn btn-danger">Edit</button>
          </Link> */}
          </div>
        </div>
      </div>
      <div className="container card profile-about-container">
        <div className="row">
          <div className="col-md-12">
            {/* {user && user.about ? (
              <div>
                <h5>About Me</h5>
                <hr />
              </div>
            ) : null} */}

            {/* <div>
              <h5>About Me</h5>
              <hr />
              {user && user.about }
            </div> */}

            <div className="user-about-page">
              <h5>About Me</h5>
              <hr />
              {user && user.about ? (
                <p>{ReactHtmlParser(user && user.about)}</p>
              ) : (
                "You did not add anything about yourself! Update your profile."
              )}
            </div>
          </div>
          {/* <div className="col-md-2 edit-button">
            <Link to={"/update-profile/" + (user && user._id)}>
              <h5>
                <AiFillEdit size={20} />
                Edit
              </h5>
            </Link> */}

          {/* <Link to={"/update-profile/" + (user && user._id)}>
            <button className="btn btn-danger">Edit</button>
          </Link> */}
          {/* </div> */}
        </div>
      </div>

      {/* <div className="container card">
        <h5>Your Selected Date is: {selectedDate?.toString()}</h5>

        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
          }}
          placeholderText="Select Your Date"
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          isClearable
          showYearDropdown
          showWeekNumbers
          
        />
    
      </div> */}

      {user && user.photo ? (
        <div className="container card profile-main-container">
          <div className="row">
            <div className="col-md-10">
              {user && user.photo ? (
                <img
                  src={user && user.photo}
                  className="profile-avatar-picture"
                />
              ) : null}
            </div>
            <div className="col-md-2 edit-button">
              <Link to={"/update-profile/" + (user && user._id)}>
                <h5>
                  <AiFillEdit size={20} />
                  Edit
                </h5>
              </Link>

              {/* <Link to={"/update-profile/" + (user && user._id)}>
            <button className="btn btn-danger">Edit</button>
          </Link> */}
            </div>
          </div>
        </div>
      ) : null}

      <div className="container p-5">
        <select
          className="custom-select"
          value={prolanguage}
          onChange={(e) => setProlanguage(e.target.value)}
        >
          <option value="JavaScript">JavaScript</option>
          <option value="Nodejsddddddddddd">Nodejs</option>

          <option value="Reactjs">React js</option>

          <option value="VueJS">Vue JS</option>
        </select>

        <h5>{prolanguage}</h5>
      </div>
    </>
  );
};

export default DashboardProfile;
