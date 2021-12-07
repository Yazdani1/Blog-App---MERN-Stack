import React, { useContext, useEffect } from "react";
import "./message.css";
import { UserContext } from "../../UserContext";

const Message = () => {
  const [usermessage, setuserMessage] = useContext(UserContext);

  return (
    <div className="card message-main-section">
      <h5>All Messages</h5>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="message-name">
              {usermessage &&
                usermessage.message.map((message) => (
                  <>
                    <li>{message.text}</li>
                    <li>{message.postedBy.name}</li>
                  </>
                ))}
            </div>
          </div>

          <div className="col-md-8">
            <div className="message-body">fdsdsfdsf</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
