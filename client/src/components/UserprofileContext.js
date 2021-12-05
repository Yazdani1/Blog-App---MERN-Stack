import React, { useState, useEffect, createContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";

export const UserProfileContext = createContext();

export const UserProfileProvider = (props) => {
    const { id } = useParams();

  const [userpublicProfile, setuserPublicprofile] = useState();


  const getMypost = () => {
    
    axios
      .get(`/auth/userprofileda/${id}`)

      .then((result) => {
        setuserPublicprofile(result.data);
        // setLoading(false);

        console.log(result.data);
      });
  };

  useEffect(() => {
    getMypost();
  }, [userpublicProfile, setuserPublicprofile]);


  return (
    <UserProfileContext.Provider
      value={[userpublicProfile, setuserPublicprofile]}
    >
      {props.children}
    </UserProfileContext.Provider>
  );
};
