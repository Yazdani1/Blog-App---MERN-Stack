import React, { useState, useEffect } from "react";
import axios from "axios";

function See() {
  const url = "https://jsonplaceholder.typicode.com/posts";

  const [dataItem, setData] = useState([]);

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="testapp">
      <ul>
        {dataItem.map((item) => {
          <h1>{item.title}</h1>;
        })}
      </ul>
      <h1>gdfg</h1>
    </div>
  );
}
export default See;
