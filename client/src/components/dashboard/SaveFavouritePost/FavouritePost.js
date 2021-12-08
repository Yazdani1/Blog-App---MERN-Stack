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
            <h1>{user && user.name}</h1>
            <h1>{user && user.email}</h1>
            <h1>{user && user.about}</h1>
            <h1>{user && user.experience}</h1>
            <h1>{user && user.favourite?._id}</h1>
            {user && user?.favourite?.map(item=>(
                
            ))}
        </div>
    );
}
 export default FavouritePost;