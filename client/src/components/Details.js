import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import Slider from "react-slick";
import { BsArrowLeft } from "react-icons/bs";

const DetailsPage = () => {
  const { id } = useParams();

  let history = useHistory();

  const [dataItem, setData] = useState([]);
  const [latestPost, setLatestpost] = useState([]);
  const [postsmore, setPosts] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
  }, [dataItem]);

  return (
    <>
      <div className="main_details">
        <div className="container card">
          <div className="row">
            <div className="col-md-7">
              <button
                className="btn btn-success tt"
                onClick={() => history.push("/")}
              >
                <BsArrowLeft />
                Back
              </button>
              <h1>{dataItem.title}</h1>

              <img
                src={dataItem.photo}
                height="300px"
                alt="Post image"
                className="det_post_image"
                width="100%"
              />
              <p>{moment(dataItem.date).format("MMMM Do YYYY")}</p>
              <p>{dataItem.des}</p>

              {/* {dataItem ? (
                <p>Posted by: {dataItem.postedBy.name}</p>
              ) : (
                <h1>Loading...</h1>
              )} */}
            </div>

            <div className="col-md-5">
              <h2>Latest Posts</h2>
              {latestPost.map((item) => (
                <div className="container">
                  <hr />
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={item.photo}
                        height="100px"
                        alt="Post image"
                        className="det_post_image"
                        width="100%"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="latest_post">
                        <Link className="latest_title" to={"/details/" + item._id}>
                          <h5>{item.title}</h5>
                        </Link>
                        <p>Posted by: {item.postedBy.name}</p>
                        <p>{moment(item.date).format("MMMM Do YYYY")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <h5>View More posts</h5>
          <Slider {...settings}>
            {postsmore.map((item) => (
              <div className="col-md-12">
                <div className="desing_home card mb-5 shadow-sm">
                  <Link
                    to={"/userprofile/" + item.postedBy._id}
                    className="name_design"
                  >
                    <p>Posted by: {item.postedBy.name}</p>
                  </Link>
                  <img src={item.photo} className="details_page_image" />
                  <p className="date_color">
                    {moment(item.date).format("MMMM Do YYYY")}
                  </p>
                  <h4>{item.title.substring(0, 15)}</h4>
                  <p>{item.des.substring(0, 20)}</p>
                  <Link to={"/details/" + item._id}>
                    <button className="btn btn-primary">Reade More</button>
                  </Link>

                  {/* <span className="read_more_button">Read More</span> */}
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
