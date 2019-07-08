import React from "react";
import { ImageService } from "./../services/image";
import ImageCard from "./ImageCard";
import JSZip from "jszip";
import _ from "lodash";
import { connect } from "react-redux";
import {
  setMaxImagesCount,
  setImages,
  setImageSelectionState
} from "../actions/imageActions";

class AdminList extends React.Component {
  initialCardsCount = 12;
  cardsIncrement = 6;

  scrollCooldown = false;
  loadCooldownTime = 850;

  constructor(props) {
    super(props);
    this.state = {
      isInitialLoading: true,
      selectedIndex: null
    };

    this.containerRef = React.createRef();
    this.imageService = new ImageService();

    this.handleScroll = _.throttle(this.handleScroll.bind(this), 250);
    this.selectedCallback = this.selectedCallback.bind(this);
    this.deleteSelected = this.deleteSelected.bind(this);
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
          canSelect: true,
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
    const elementsLeftCount =
      this.props.imageContainer.maxImagesCount -
      this.props.imageContainer.images.length;
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
        this.props.dispatch(
          setImages(this.props.imageContainer.images.splice(0, maxImagesCount))
        );
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

  selectedCallback(index) {
    if (this.state.selectedIndex == null) {
      for (let i = index; i < this.props.imageContainer.images.length; i++) {
        this.props.dispatch(setImageSelectionState(i, true));
      }
      this.setState({ selectedIndex: index });
    } else {
      if (this.props.imageContainer.images[index].isSelected) {
        for (let i = this.state.selectedIndex; i <= index; i++) {
          this.props.dispatch(setImageSelectionState(i, false));
        }
        if (index + 1 === this.props.imageContainer.images.length) {
          this.setState({ selectedIndex: null });
        } else {
          this.setState({ selectedIndex: index + 1 });
        }
      } else {
        for (let i = this.state.selectedIndex; i <= index; i++) {
          this.props.dispatch(setImageSelectionState(i, false));
        }
        for (let i = index; i <= this.state.selectedIndex; i++) {
          this.props.dispatch(setImageSelectionState(i, true));
        }
        this.setState({selectedIndex: index});
      }
    }
  }

  render() {
    let content;
    if (this.state.isInitialLoading) {
      content = <p>Loading...</p>;
    } else if (this.props.imageContainer.images.length) {
      const cards = this.props.imageContainer.images.map(img => {
        const props = {
          key: img.index,
          id: img.index,
          url: img.imageUrl,
          canSelect: img.canSelect,
          isSelected: img.isSelected,
          selectedCallback: this.selectedCallback
        };

        return <ImageCard {...props} />;
      });

      content = (
        <ul
          className="list-container"
          ref={this.containerRef}
          onScroll={this.handleScroll}
        >
          {cards}
        </ul>
      );
    } else {
      content = <p> The list is empty </p>;
    }

    return (
      <article className="m-3">
        <h2>List </h2>
          <button className="btn btn-info mt-3" variant="info" onClick={this.deleteSelected} disabled={this.state.selectedIndex === null}>
            Delete selected images
          </button>
        {content}
      </article>
    );
  }

  async deleteSelected() {
    if (this.state.selectedIndex === null) {
      return;
    }

    try {
      const result = await this.imageService.deleteImages(
        this.state.selectedIndex
      );
      if (result) {
        this.removeImages();
      } else {
        console.warn("Could not delete images:");
        console.warn(result);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  removeImages() {
    const newImages = this.props.imageContainer.images.splice(0, this.state.selectedIndex);
    this.props.dispatch(setImages(newImages));
    this.setState({ selectedIndex: null });
  }
}

function mapStateToProps() {
  return state => {
    return {
      imageContainer: state.image,
      isLoggedIn: state.auth.isLoggedIn
    };
  };
}

export default connect(mapStateToProps())(AdminList);
