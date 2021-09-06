import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";

function Home() {

  const [dataItem, setData] = useState([]);

  useEffect(() => {
    axios.get('/auth/getpost').then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="row">
        {dataItem.map((item, index) => (
          <div className="col-md-4">
            <h1>{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
