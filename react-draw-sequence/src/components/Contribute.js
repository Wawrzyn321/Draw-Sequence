import React from "react";
import { NavLink } from 'react-router-dom';
//import styles from  './../styles/contribute.module.css';

export const Contribute = props => {

  return (
    <article className="m-3">
      <h2>Contribute to Draw-Sequence</h2>
      <p>
        Here you can add your number to the sequence, either by posting your own
        image with next number of the sequence, or by drawing it on the panel
        below.{" "}
      </p>
      <p>Next number to draw: &lt;TOOD&gt;.</p>
      <ul className="nav nav-tabs">
        <li className="active nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/contribute/draw">
            Draw
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink activeClassName="active" className="nav-link" to="/contribute/upload">
            Upload a picture
          </NavLink>
        </li>
      </ul>
    </article>
  );
};
