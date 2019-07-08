import React from "react";
import { NavLink } from "react-router-dom";
import styles from './../styles/navigation.module.css';

export default class Navigation extends React.Component {


  render() {
    const selectedClass = styles['selected'];
    const linkClass = styles['router-link'];

    return (
      <nav className="navbar navbar-dark bg-info navbar-expand-sm">
        <NavLink className="navbar-brand" to="/list">
          Draw-Sequence
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={selectedClass + " nav-item"}>
              <NavLink activeClassName={selectedClass} className={linkClass} to="/list">Counter</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName={selectedClass} className={linkClass} to="/contribute/upload">Contribute</NavLink>
            </li>
            <li className="nav-item">
              <NavLink activeClassName={selectedClass} className={linkClass} to="/about">About</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
