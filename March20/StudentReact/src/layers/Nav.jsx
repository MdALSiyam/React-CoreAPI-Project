import React from "react";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg mb-2"
        style={{ backgroundColor: "#555" }}
      >
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/list">
                Art List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/list/add">
                Create Art
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
