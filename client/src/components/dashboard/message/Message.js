import React, { useContext, useEffect } from "react";
import "./message.css";
import { UserContext } from "../../UserContext";
import { Link, useHistory, useParams } from "react-router-dom";
import moment from "moment";

const Message = () => {
  const [state, setState] = useContext(UserContext);

  useEffect(() => {}, [state]);

  return (
    <div className="card message-main-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="message-name">
            
              {state &&
                [...(state && state.user && state.user.message)]
                  .reverse()
                  .map((message, index) => (
                    <>
                      <div className="message-body" key={index}>
                        <div className="row">
                          <div className="col-md-1">
                            <div className="message-name-circle">
                              <p>
                                {state &&
                                    state.user && state.user.message?.postedBy?.name?.substring(0, 2)
                                  .toUpperCase()}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-11">
                            <div className="user-fullname">
                              <Link
                                to={
                                  "/userprofile/" +
                                  (state &&
                                    state.user &&
                                    state.user.message.postedBy?._id)
                                }
                                style={{ textDecoration: "none" }}
                              >
                                <h5>
                                  {state &&
                                    state.user &&
                                   message?.postedBy?.name}
                                </h5>
                              </Link>

                              <p>
                                {moment(
                                  state && state.user && state.user.message.date
                                ).format("lll")}
                              </p>

                              <p>
                                {state && state.user && state.user.message?.text}
                              </p>

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
