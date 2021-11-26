import React, { useState, useEffect, createContext } from "react";
import axios from "axios";


export const UserGlobalContext = createContext();

export const UserGlobalProvider = ({children}) => {
  const [state, setState] = useState({
    token: "",
  });

  useEffect(()=>{
      setState(JSON.parse(window.localStorage.getItem("tokenLogin")));
  },[]);

  return (
    <UserGlobalContext.Provider value={[state, setState]}>
      {children}
    </UserGlobalContext.Provider>
  );
};
