import React,{useState,useEffect,createContext} from "react";

export const PostContext = createContext();

export const PostProvider = (props)=>{

    return(
        <PostContext.Provider>
            {props.children}
        </PostContext.Provider>
    );

}