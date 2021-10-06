import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Slider from "react-slick";

const DetailsPage = () => {
  const { id } = useParams();

  const [dataItem, setData] = useState([]);
  const [latestPost, setLatestpost] = useState([]);
  const [postsmore, setPosts] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const getDetailsData = async () => {
    await axios
      .get("/auth/details/" + id)

      .then((result) => {
        setData(result.data);
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getlatestPost = async () => {
    await axios
      .get("/auth/latestpost")
      .then((res) => {
        setLatestpost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //get other posts here

  const morePost = async () => {
    await axios
      .get("/auth/getpost")
      .then((res) => {
        setPosts(res.data.resultGet);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetailsData();
    getlatestPost();
    morePost();
  }, []);

  return (
    <>
      <div className="main_details">
        <div className="container card">
          <div className="row">
            <div className="col-md-8">
              <h1>{dataItem.title}</h1>
              <img src={dataItem.photo} height="300px" width="100%" />
              <p>{dataItem.des}</p>
              {/* <p>Posted by: {dataItem.postedBy.name}</p> */}
              <p>Published on:{moment(dataItem.date).format("MMMM Do YYYY")}</p>
            </div>

            <div className="col-md-4 card">
              {latestPost.map((item) => (
                <div>
                  <h5>{item.title}</h5>
                  <p>Posted by: {item.postedBy.name}</p>
                  <p>Published on:{moment(item.date).format("MMMM Do YYYY")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container">
          <h1>More Posts</h1>

          <Slider {...settings}>
            {postsmore.map((item) => (
              <div className="row">
                <div className="col-lg-12 col-sm-2">
                  <div className="desing_home card mb-5 shadow-sm">
                    <Link
                      to={"/userprofile/" + item.postedBy._id}
                      className="name_design"
                    >
                      <p>Posted by: {item.postedBy.name}</p>
                    </Link>
                    <img src={item.photo} className="images" />
                    <p className="date_color">
                      Published on:
                      {moment(item.date).format("MMMM Do YYYY")}
                    </p>
                    <h4>{item.title.substring(0, 15)}</h4>
                    <p>{item.des.substring(0, 20)}</p>
                    <Link to={"/details/" + item._id}>
                      <p>Read More</p>
                    </Link>

                    {/* <span className="read_more_button">Read More</span> */}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default DetailsPage;
