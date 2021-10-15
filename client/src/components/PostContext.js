import React,{useState,useEffect,createContext} from "react";

export const PostContext = createContext();

export const PostProvider = (props)=>{

  const [dataItem, setData] = useState([]);
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
      
        morePost();
      }, [dataItem]);
    return(
        <PostContext.Provider>
            {props.children}
        </PostContext.Provider>
    );

}