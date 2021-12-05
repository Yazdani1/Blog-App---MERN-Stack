import React,{useContext} from "react";
import { UserContext } from "../UserContext";
import "./Homepage.css";

const FirstSection = () => {

  const [user,setUser] = useContext(UserContext);

  return (
    <>
      <div className="container first_section">

        <div className="homepage-first">

  
        </div>

        <div class="top-left">
          <div className="card first_Section_data">
            <h5>Welcome to this Blog App</h5>
            <p>Learn from others and share your pots with others</p>
            <h1>{user && user.name}</h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstSection;
