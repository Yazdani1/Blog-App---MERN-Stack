import React, { useContext, useEffect } from "react";
import "./message.css";
import { UserContext } from "../../UserContext";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { FcCustomerSupport } from "react-icons/fc";





const Message = () => {
  const [usermessage, setuserMessage] = useContext(UserContext);

  useEffect(() => {}, [usermessage]);

  return (
    <div className="card message-main-section">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="message-name">
              <h5>All Messages: {usermessage.message?.length}</h5>
              {usermessage &&
                [...usermessage.message].reverse().map((message, index) => (
                  <>
                    <div className="message-body" key={index}>
                      <div className="row">
                        <div className="col-md-1">
                          {message && message?.postedBy?.photo ? (
                            <img
                              src={message && message?.postedBy?.photo}
                              className="message-image-circle"
                            />
                          ) : (
                            <div className="message-name-circle">
                              <p>
                                {message &&
                                  message?.postedBy?.name
                                    .substring(0, 2)
                                    .toUpperCase()}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="col-md-11">
                          <div className="user-fullname">
                            <Link
                              to={
                                "/userprofile/" +
                                (message && message.postedBy?._id)
                              }
                              style={{ textDecoration: "none" }}
                            >
                              <h5>{message?.postedBy?.name}</h5>
                            </Link>

                            <p>{moment(message.date).format("lll")}</p>

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
              {usermessage && usermessage?.message?.length === 0 ? (
                <h5 className="card noposts-design">
                  <FcCustomerSupport size={200} />
                  You don't have any message!
                </h5>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;
