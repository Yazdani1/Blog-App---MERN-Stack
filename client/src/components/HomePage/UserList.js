import React, { useEffect, useState } from "react";
import { getUserList } from "./Apihomepage";

const UserList = () => {
  const [alluser, setAlluser] = useState([]);

  const loadallUser = () => {
    getUserList()
      .then((data) => {
        setAlluser(data);
        console.log("Usr all list"+data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadallUser();
  }, []);

  return (
    <div>
      <p>{JSON.stringify(alluser)}</p>
      <p>All User List is gonna stay here</p>
    </div>
  );
};
export default UserList;
