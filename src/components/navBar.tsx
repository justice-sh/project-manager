import React from "react";
import { NavLink, Link } from "react-router-dom";

export interface NavBarProps {
  user: any;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Project Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link nav-item" to="/projects">
              Projects
            </NavLink>
            {!user && (
              <NavLink className="nav-link nav-item" to="/login">
                Login
              </NavLink>
            )}
            {user && (
              <React.Fragment>
                <NavLink className="nav-link nav-item" to="/profile">
                  {user.name}
                </NavLink>
                <NavLink className="nav-link nav-item" to="/logout">
                  Logout
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
