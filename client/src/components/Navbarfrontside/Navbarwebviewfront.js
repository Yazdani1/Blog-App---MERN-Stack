import React from "react";

const Navbarwebviewfront = () => {
  return (
    <>
      <div className="nav-dashboard-headear">
        <li>
          <GiHamburgerMenu size={25} onClick={props.data} />
        </li>
        <ul>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <li>Home</li>
          </Link>
          <li>{userdetails && userdetails.name}</li>

          <div className="profile-image">
            {userdetails && userdetails.photo ? (
              <img src={userdetails && userdetails.photo} />
            ) : (
              <div className="profile-nave-avatar">
                <h4>
                  {userdetails &&
                    userdetails.name.substring(0, 2).toUpperCase()}
                </h4>
              </div>
            )}
          </div>

        </ul>
      </div>
    </>
  );
};

export default Navbarwebviewfront;
