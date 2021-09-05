import React, { useState } from "react";
import "../App.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

const Post = () => {
  return (
    <div>
      <div className="container designdata card">
        <div className="row">
          <h1 className="toptest">Create Post</h1>
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input type="text" className="form-control" />
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea2">Description</label>
              <textarea
                class="form-control rounded-0"
                id="exampleFormControlTextarea2"
                rows="5"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-success custBtn">
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Post;
