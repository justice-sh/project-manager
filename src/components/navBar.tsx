import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import seed from "../seed";

export interface NavBarProps {
  user: any;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const [reveal, setReveal] = useState(false);
  const dev = process.env.NODE_ENV === "development";

  const classes = `collapse navbar-collapse ${reveal ? "navbar-reveal" : ""}`;

  return (
    <Wrapper className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Project Manager
        </Link>
        <button className="navbar-toggler" onClick={() => setReveal(!reveal)}>
          {reveal ? (
            <span>X</span>
          ) : (
            <span className="navbar-toggler-icon"></span>
          )}
        </button>
        <div className={classes} id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link nav-item" to="/projects">
              Projects
            </NavLink>
            <NavLink className="nav-link nav-item" to="/featured">
              Featured
            </NavLink>
            {!user && (
              <NavLink className="nav-link nav-item" to="/login">
                Login
              </NavLink>
            )}
            {user && (
              <>
                <NavLink className="nav-link nav-item" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link nav-item" to="/logout">
                  Logout
                </NavLink>
              </>
            )}
            {user && user.isAdmin && (
              <div className="nav-button-container">
                <Link to="/projectForm/new" className="btn btn-primary btn-sm">
                  New Project
                </Link>
                {dev && (
                  <button className="btn btn-danger btn-sm" onClick={seed}>
                    Seed
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  .navbar-collapse {
    position: relative;
  }

  .nav-button-container {
    position: absolute;
    right: 10px;
  }

  @media (max-width: 980px) {
    .navbar-reveal {
      display: flex;
    }

    .nav-button-container {
      position: static;
    }
  }
`;

export default NavBar;
