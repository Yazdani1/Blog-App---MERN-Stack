import React, { useContext, useEffect } from "react";
import "./message.css";
import { UserContext } from "../../UserContext";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";

const Message = () => {
  const [usermessage, setuserMessage] = useContext(UserContext);

  useEffect(() => {}, [usermessage]);

  return (
    <div className="card message-main-section">
      <h5>All Messages</h5>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="message-name">
              {usermessage &&
                usermessage.message.reverse().map((message) => (
                  <>
                    <div className="message-body">
                      <div className="row">
                        <div className="col-md-1">
                          <div className="message-name-circle">
                            <p>
                              {message &&
                                message?.postedBy?.name
                                  .substring(0, 2)
                                  .toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-11">
                          <div className="user-fullname">
                            <h5>{message?.postedBy?.name}</h5>

                            <p>
                              {moment(message.date).format('lll')}
                            </p>

                            <p>{message.text}</p>

                            {/* <Link to={"/userprofile/" + user._id}>
                              <span className="view-profile">View Profile</span>
                            </Link> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
