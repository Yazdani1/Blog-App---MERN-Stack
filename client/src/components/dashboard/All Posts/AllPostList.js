import React from "react";
import Allpost from "./Allpost";
import ReactHtmlParser from "react-html-parser";
import { Link, useHistory } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import axios from "axios";
import { MdDelete } from "react-icons/md";


const AllPostList = ({ photo, title, des, index, ID }) => {

      //delete data item
  function deletePost(id) {
    axios.delete("/auth/delete/" + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    
  }


  return (
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Photo</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th colspan="3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{index + 1}</th>
          <td>
            <img src={photo} height="80px" width="80px"></img>
          </td>
          <td>{title?.substring(0, 30)}</td>
          <td>{ReactHtmlParser(des?.substring(0, 80))}</td>

          <td>
            <Link to={"/editpost/" + ID}>
              <button className="btn btn-success">
                <AiTwotoneEdit size={20} />
                Edit
              </button>
            </Link>
          </td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => {
                deletePost(ID);
                
              }}
            >
              <MdDelete size={20} /> Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
export default AllPostList;
