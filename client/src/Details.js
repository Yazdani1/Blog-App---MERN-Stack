import React, { useState } from "react";
import Nav from "./Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Details() {
  const [dropdown, setDropdown] = useState(false);
  const toggleOpen = () => setDropdown(!dropdown);

  const notify = () => {
    toast.success("Post Added Successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleOpen}>
        Dropdown
      </button>
      <div
        className={`dropdown-menu ${dropdown ? "show" : ""}`}
        aria-labelledby="dropdownMenuButton"
      >
        <a className="dropdown-item" href="#">
          Delete
        </a>
        <a className="dropdown-item" href="#">
          Pin to your Profile
        </a>
      </div>
    </div>
  );
}
export default Details;
