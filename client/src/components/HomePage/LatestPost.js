import React, { useState, useEffect } from "react";

import { latestPost } from "./Apihomepage";

const LatestPost = () => {
  const [latestpost, setLatestpost] = useState([]);

  const loadLatestpost = () => {
    latestPost()
      .then((data) => {
        setLatestpost(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadLatestpost();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {latestpost.map((item, index) => (
          <div className="col-lg-6 col-md-12 col-sm-12" key={index}>
            <div className="card main-card-latest-post">
              <div className="item-card-design">
             
                  <img src={item.photo} className="latest-post-image" />
             
                <div className="post-data">
                  <h5>gdfgdf</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LatestPost;
