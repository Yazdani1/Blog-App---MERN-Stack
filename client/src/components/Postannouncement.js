import React from "react";
import "../App.css";

const Postaccouncement = () => {
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
              ></textarea>
            </div>

            <button type="submit" class="btn btn-success custBtn">
              Publish Announcement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Postaccouncement;
