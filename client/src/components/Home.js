import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../App.css";
import moment from "moment";
import { MdAccountBox } from "react-icons/md";
import { MdAssessment } from "react-icons/md";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import { GoCalendar } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LoadingOutlined } from "@ant-design/icons";
import { SyncOutlined } from "@ant-design/icons";

import FirstSection from "./HomePage/FirstSection";
import AllUserList from "./HomePage/UserList";
import { UserContext } from "./UserContext";
import "./css/home-mainpost.css";
import "./HomePage/Homepage.css";
import renderHTML from "react-render-html";
import ReactHtmlParser from "react-html-parser";
import Totalpostcount from "./HomePage/TotalPostCount";
import Pagination from "./HomePage/Pagination";
import Footer from "./footer";

// import { Pagination } from "antd";

function Home() {
  var settings = {
    dots: true,
    infinite: false,
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

  var userOpinion = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  const [dataItem, setData] = useState([]);
  const [latestPost, setLatestpost] = useState([]);
  const [userDatails] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  //for pagination state..number pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataItem.slice(indexOfFirstPost, indexOfLastPost);
  const howManyPages = Math.ceil(dataItem.length / postsPerPage);

  //for pagination

  // const [totalPosts, setTotalPosts] = useState(0);
  // const [page, setPage] = useState(1);

  //get users opinion

  const [opinion, setOpinion] = useState(null);
  const history = useHistory();
  const getOpinion = async () => {
    await axios
      .get("/auth/opinion")
      .then((res) => {
        setOpinion(res.data.mypostdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [pageNumberLimit, setpageNumberLimit] = useState(5);
  // const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
  // const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  //for pagination load more features

  // const [currentPage, setcurrentPage] = useState(1);
  // const [itemsPerPage, setitemsPerPage] = useState(5);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = dataItem.slice(indexOfFirstItem, indexOfLastItem);

  //for pagination load more features

  // const handleLoadMore = () => {
  //   setitemsPerPage(itemsPerPage + 5);
  // };

  const [user, setUser] = useState([]);

  const getUser = async () => {
    await axios.get("/auth/allusers").then((res) => {
      setUser(res.data);
    });
  };

  const getLatestPost = () => {
    axios.get("/auth/latestpost").then((res) => {
      setLatestpost(res.data);
      console.log(res.data);
    });
  };

  //to show pagination
  // const newsFeed = () => {
  //   axios.get(`/auth/getpost/${page}`).then((res) => {
  //     setData(res.data.resultGet);
  //     setLoading(false);
  //     console.log(res.data.resultGet);
  //   });
  // };
  const newsFeed = () => {
    axios.get("/auth/getpost").then((res) => {
      setData(res.data.resultGet);
      setLoading(false);
      console.log(res.data.resultGet);
    });
  };

  useEffect(() => {
    newsFeed();
    getLatestPost();
    getUser();
    getOpinion();
  }, []);

  //to count all post from database used this effect

  // useEffect(() => {
  //   try {
  //     axios.get("/auth/total-posts").then(({ data }) => setTotalPosts(data));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const addlikePost = (id) => {
    fetch("/auth/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        const newItemData = dataItem.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newItemData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addunlikePost = (id) => {
    fetch("/auth/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newItemData = dataItem.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newItemData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
      <div class="text-center my-5">
        <h1>
          <SyncOutlined spin />
        </h1>
      </div>
    );
  }

  // const renderData = (dataItem) to use more pagination

  const renderData = () => {
    return (
      <div class="dd">
        <div class="text-center my-5">{/* <h1>Blog App</h1> */}</div>

        {/* //mainpost section */}
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {currentPosts.map((item) => (
                  <div className="col-md-12 card postitem" key={item._id}>
                    <div className="row">
                      <div className="col-md-4">
                        <img src={item.photo} className="home-post-imagess" />
                      </div>
                      <div className="col-md-8">
                        <div className="desing_home_post">
                          <div className="user_info">
                            <div className="user_pic">
                              <Link
                                to={"/userprofile/" + item.postedBy._id}
                                className="name_design"
                              >
                                <div className="user_pic_home_page">
                                  <p>
                                    {item.postedBy.name
                                      .substring(0, 2)
                                      .toUpperCase()}
                                  </p>
                                </div>
                              </Link>
                            </div>
                            <div className="user_name">
                              <Link
                                to={"/userprofile/" + item.postedBy._id}
                                className="name_design"
                              >
                                <p>
                                  {item.postedBy.name}.{" "}
                                  {moment(item.date).fromNow()} - (
                                  {moment(item.date).format("MMMM Do YYYY")})
                                </p>
                              </Link>
                            </div>
                          </div>
                          {/* <p className="date_color">
                            <GoCalendar />{" "}
                            {moment(item.date).fromNow()} - (
                            {moment(item.date).format("MMMM Do YYYY")})
                          </p> */}

                          <h5>{item.title.substring(0, 35)}</h5>
                          <p>{ReactHtmlParser(item.des.substring(0, 150))}</p>
                          <hr />

                          <div className="likes">
                            <p>
                              {item.likes?.length}.
                              {item.likes.length > 0 ? "Likes" : "Like"}
                            </p>

                            {item.likes.includes(
                              userDatails && userDatails._id
                            ) ? (
                              <p
                                onClick={() => {
                                  addunlikePost(item._id);
                                }}
                              >
                                <AiOutlineDislike size={20} />
                              </p>
                            ) : (
                              <p
                                onClick={() => {
                                  if (!localStorage.getItem("tokenLogin")) {
                                    history.push("/signin");
                                  } else {
                                    addlikePost(item._id);
                                  }
                                }}
                              >
                                <AiOutlineLike size={20} />.
                              </p>
                            )}

                            <Link
                              to={"/details/" + item._id}
                              style={{ textDecoration: "none" }}
                            >
                              <p>
                                <FaRegCommentDots /> {item.comments.length}
                              </p>
                            </Link>

                            <Link
                              to={"/details/" + item._id}
                              style={{ textDecoration: "none" }}
                            >
                              <p>
                                {item.comments.length > 0
                                  ? "Comments"
                                  : "Comment"}
                              </p>
                            </Link>
                          </div>

                          {/* <button onClick={() => addtoWishList(item._id)}>SAVE</button> */}

                          {/* <Link to={"/details/" + item._id}>
                            <button className="btn btn-primary">
                              Reade More <AiOutlineArrowRight />
                            </button>
                          </Link> */}
                        </div>
                      </div>
                    </div>
                    {/* <hr /> */}
                  </div>
                ))}

                {dataItem.length > 1 ? (
                  <div className="card container">
                    <Pagination
                      pages={howManyPages}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className="col-md-4">
              <h5 className="latest-posts-title card">Latest posts</h5>
              <div className="latest-post-part card">
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
                          <Link
                            className="latest_title"
                            to={"/details/" + item._id}
                          >
                            <h5>{item.title.substring(0, 25)}</h5>
                          </Link>
                          <p>
                            <FaUserCircle /> {item.postedBy.name}
                          </p>
                          <p>
                            <GoCalendar />{" "}
                            {moment(item.date).format("MMMM Do YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* {currentItems.length >= 5 ? (
                  <button onClick={handleLoadMore} className="loadmore">
                    More Posts
                  </button>
                ) : (
                  "Posts are less than 30"
                )} */}
          </div>
        </div>
        <div className="container">
          <h5>Visit User Profile</h5>
          <AllUserList />

          {/* <Slider {...settings}>
            {user.map((useritem) => (
              <div className="useritems">
                <div className="desing_home card mb-5 shadow-sm">
                  <div className="profile_pic">
                    <h2>
                      {useritem.name.match(/\b\w/g).join("").toUpperCase()}
                    </h2>
                  </div>

                  <h4>{useritem.name}</h4>

                  <p className="date_color">
                    Member Since:
                    <GoCalendar />{" "}
                    {moment(useritem.date).format("MMMM Do YYYY")}
                  </p>

                  <Link to={"/userprofile/" + useritem._id}>
                    <button className="btn btn-success profile_button">
                      View Profile
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </Slider> */}

          {/* <>
            {opinion ? (
              <div className="text-center my-5 userwords">
                <h5 className="usersopinion_text">Users Words</h5>
                <div className="container">
                  <div className="row">
                    <Slider {...userOpinion}>
                      {opinion.map((opinionitem) => (
                        <div className="card allopinion">
                          <h3>{opinionitem.postedBy.name}</h3>
                          <h4>{opinionitem.des}</h4>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            ) : (
              <h1>Loading..</h1>
            )}
          </> */}
        </div>
      </div>
    );
  };
  return (
    <>
      <FirstSection />
      <Totalpostcount totalpost={dataItem.length} totaluser={user.length} />

      {/* {renderData(currentItems)} */}

      {renderData()}
      <Footer />
    </>
  );

  //currentItems

  // <div className="container">
  //   <div className="row">
  //     <div className="col-md-8">
  //       {dataItem.map((item) => (
  //         <div className="card top">
  //           <img src={item.photo} className="img-fluid"  height="200px"/>
  //           {/* <h3>{item.postedBy.name}</h3>
  //           <h3>{item.postedBy.email}</h3> */}
  //           <p>Published on:{moment(item.date).format("MMMM Do YYYY")}</p>
  //           <h5>{item.title}</h5>
  //           <p>{item.des.substring(0, 50)}</p>
  //           <Link to={"/userprofile/" + item.postedBy._id}>
  //             <p>Posted by: {item.postedBy.name}</p>
  //           </Link>
  //           <span className="read">Read More ...</span>
  //         </div>
  //       ))}
  //     </div>
  //     <div className="col-md-4">
  //       <h5 className="title lstestpostTitle">New Posts</h5>
  //       {latestPost.map((item) => (
  //         <div className="card latestPosts">
  //           <h5>{item.title}</h5>
  //           <p>{item.des.substring(0, 50)}</p>
  //           <p>Posted by: {item.postedBy.name}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // </div>
}
export default Home;
