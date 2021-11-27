import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

{
  /* <h1>Test is going on</h1> */
}

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState("");

  // const [user, setUser] = useState({
  //   token:""
  // });

  const getUser = async () => {
    await axios
      .get("/auth", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
        },
      })
      .then((data) => {
        if(data){
          setUser(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, [user,setUser]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
