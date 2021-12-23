import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

{
  /* <h1>Test is going on</h1> */
}

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState("");

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
          // localStorage.getItem("tokenLogin");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, [user,setUser]);

  // const [state, setState] = useState({
  //   user: {},
  //   token: "",
  // });

  // useEffect(()=>{
  //   setState(JSON.parse(window.localStorage.getItem("tokenLogin")));
  // },[]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
