import React from "react";
import { ImageService } from "./../services/image";
import ImageCard from "./ImageCard";
import JSZip from "jszip";
import { Link } from "react-router-dom";
import _ from "lodash";
import { connect } from 'react-redux';
import { setMaxImagesCount, setImages } from "../actions/imageActions";

class List extends React.Component {
  initialCardsCount = 12;
  cardsIncrement = 6;

  scrollCooldown = false;
  loadCooldownTime = 850;

  constructor(props) {
    super(props);
    this.state = {
      isInitialLoading: true
    };

    this.containerRef = React.createRef();
    this.imageService = new ImageService();

    this.handleScroll = _.throttle(this.handleScroll.bind(this), 250);
  }

  componentDidMount() {
    this.activated();
  }

  async fetchCards(offset, limit) {
    try {
      const blob = await this.imageService.getImagesBlob(offset, limit);

      const newZip = new JSZip();
      const zip = await newZip.loadAsync(blob);

      let index = offset;
      const images = this.props.imageContainer.images;
      for (const filename in zip.files) {
        const content = await zip.files[filename].async("blob");
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(content);
        images.push({
          isSelected: false,
          imageUrl,
          index
        });
        index++;
      }
      this.props.dispatch(setImages(images));
    } catch (err) {
      console.warn(err);
    }
  }

  async handleScroll() {
    const elementsLeftCount = this.props.imageContainer.maxImagesCount - this.props.imageContainer.images.length;
    if (elementsLeftCount === 0 || this.scrollCooldown) {
      return;
    }
    const e = this.containerRef.current;
    const isOnBottom = e.scrollTop === e.scrollHeight - e.clientHeight;
    if (isOnBottom) {
      const cardsToAdd = Math.min(this.cardsIncrement, elementsLeftCount);
      await this.addCards(cardsToAdd, true);
    }
  }

  async addCards(cardsToAdd, wasScrolled = false) {
    if (cardsToAdd < 0) {
      throw new Error("negative cards to add: " + cardsToAdd);
    }

    await this.fetchCards(
      this.props.imageContainer.images.length,
      this.props.imageContainer.images.length + cardsToAdd
    );

    this.scrollCooldown = true;
    setTimeout(() => {
      this.scrollCooldown = false;
      if (wasScrolled) {
        this.handleScroll();
      }
    }, this.loadCooldownTime);
  }

  async activated() {
    try {
      const maxImagesCount = await this.imageService.getImageCount();
      this.props.dispatch(setMaxImagesCount(maxImagesCount));
      if (maxImagesCount < this.props.imageContainer.images.length) {
        this.props.dispatch(setImages(this.props.imageContainer.images.splice(0, maxImagesCount)))
      } else if (maxImagesCount !== this.props.imageContainer.images.length) {
        const cardsToAdd = Math.min(
          maxImagesCount - this.props.imageContainer.images.length,
          this.initialCardsCount
        );
        await this.addCards(cardsToAdd);
      }
      this.setState({ isInitialLoading: false });
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    let content;
    if (this.state.isInitialLoading) {
      content = <p>Loading...</p>;
    } else if (this.props.imageContainer.images.length) {
      const cards = this.props.imageContainer.images.map(img => (
        <ImageCard key={img.index} id={img.index} url={img.imageUrl} />
      ));

      content = (
        <ul className="list-container" ref={this.containerRef} onScroll={this.handleScroll}>
          {cards}
        </ul>
      );
    } else {
      content = (
        <p>
          There is nothing there now, why don't you check out the{" "}
          <Link to="/contribute">Contribute</Link> tab?
        </p>
      );
    }

    return (
      <article className="m-3">
        <h2>Counting List </h2>
        {content}
      </article>
    );
  }
}

function mapStateToProps() {
  return (state) => {
    return { 
      imageContainer: state.image
     };
  };
}

export default connect(mapStateToProps())(List);

