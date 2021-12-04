import React,{useEffect,useState,useContext} from "react";

import {getFavouritePost,removeFavouritePost} from "./ApiFavourite";
import { UserContext } from "../../UserContext";


const FavouritePost = ()=>{

    const[wishlist,setWishlist] = useState([]);
    const[user,setUser] = useContext(UserContext);

    const loadWishlist = ()=>{
        getFavouritePost().then(data=>{
            setWishlist(data);
            console.log(data);
        });
    }

    useEffect(()=>{
        loadWishlist();
    },[])

    return(
        <div className="container card">
            {JSON.stringify(wishlist)};
        </div>
    );
}
 export default FavouritePost;