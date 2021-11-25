import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

{
  /* <h1>Test is going on</h1> */
}

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  // const [user, setUser] = useState({
  //   token:""
  // });

  const getUser = async () => {
    const res = await axios.get("/auth", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenLogin")}`,
      },
    });
    setUser(res.data);
  };
  useEffect(() => {
    // setUser(JSON.parse(window.localStorage.getItem("tokenLogin")));

    getUser();
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
