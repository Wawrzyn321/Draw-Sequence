import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { ImageService } from './../services/image';
import { setMaxImagesCount } from "../actions/imageActions";

class Contribute extends React.Component {

  constructor(props){
    super(props);

    this.imageService = new ImageService();
  }

  async componentDidMount() {
    const maxImagesCount = await this.imageService.getImageCount();
    this.props.dispatch(setMaxImagesCount(maxImagesCount));
  }

  render() {
    return (
      <article className="m-3">
        <h2>Contribute to Draw-Sequence</h2>
        <p>
          Here you can add your number to the sequence, either by posting your
          own image with next number of the sequence, or by drawing it on the
          panel below.{" "}
        </p>
        <p>Next number to draw: {this.props.nextImageToDraw + 1}.</p>
        <ul className="nav nav-tabs">
          <li className="active nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/contribute/draw"
            >
              Draw
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              activeClassName="active"
              className="nav-link"
              to="/contribute/upload"
            >
              Upload a picture
            </NavLink>
          </li>
        </ul>
      </article>
    );
  }
}

function mapStateToProps() {
  return state => {
    return {
      nextImageToDraw: state.image.maxImagesCount
    };
  };
}

export default connect(mapStateToProps())(Contribute);
