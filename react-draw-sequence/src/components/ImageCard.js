import React from "react";
import { connect } from 'react-redux';

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.getContainerClass = this.getContainerClass.bind(this);
  }

  handleClick() {
    if (this.props.canSelect) {
      this.props.selectedCallback(this.props.id);
    }
  }

  getContainerClass() {
    return "badge " + (this.props.state[this.props.id].isSelected ? "badge-dark" : "badge-info");
  }

  render() {
    return (
      <li className="image-card" onClick={this.handleClick}>
        <span className={this.getContainerClass()}>
          <p className="image-card-title">{this.props.id + 1}</p>
        </span>
        <img src={this.props.url} alt={"Loading " + this.props.id} />
      </li>
    );
  }
}

function mapStateToProps() {
  return state => {
    return {
      state: state.image.images
    };
  };
}

export default connect(mapStateToProps)(ImageCard);
