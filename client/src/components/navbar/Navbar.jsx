import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Navbar.scss";

const Navbar = () => {
  //hooks
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const [active, setActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // variables
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //functions
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  //return
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        {/* logo */}
        <Link to="/" className="link">
          <div className="logo">
            <span className="text">fiverr</span>
            <span className="dot">.</span>
          </div>
        </Link>

        {/* NavLinks */}
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <Link to="/login" className="link">
            <span>Sign In</span>
          </Link>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (
            <Link to="/register" className="link">
              <button>Join</button>
            </Link>
          )}

          {/* currentuser icon*/}
          {currentUser && (
            <div className="user">
              <img
                src={currentUser.img || "/img/noavatar.jpg"}
                alt=""
                onClick={() => setShowOptions(!showOptions)}
              />
              <span onClick={() => setShowOptions(!showOptions)}>
                {/* making first letter capital */}
                {currentUser.username
                  .slice(0, 1)
                  .toUpperCase()
                  .concat(
                    currentUser.username.slice(1, currentUser.username.lenght)
                  )}
              </span>
              {showOptions && (
                <div
                  className="options"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  {currentUser.isSeller && (
                    <>
                      <Link to={"/mygigs"} className="link">
                        My Gigs
                      </Link>
                      <Link to={"/add"} className="link">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to={"/orders"} className="link">
                    Orders
                  </Link>
                  <Link to={"/messages"} className="link">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* menu */}
      {active === true && (
        <div>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
