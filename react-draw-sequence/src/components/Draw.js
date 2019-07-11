import React from "react";
import DrawingCanvas from "./DrawingCanvas";
import { ImageService } from './../services/image';
import { connect } from 'react-redux';
import UploadSummary from "./UploadSummary";
import { setMaxImagesCount } from "../actions/imageActions";

class Draw extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      lastResult: null,
      submitButtonText: "Submit"
    };

    this.imageService = new ImageService();
    this.canvasRef = React.createRef();

    this.submit = this.submit.bind(this);
  }

  async submit(e) {
    e.preventDefault();
    const file = this.createFileToUpload();
    await this.upload(file);
  }

  async upload(file) {
    this.setState({lastResult: null});
    const dataModel = new FormData();
    dataModel.append("file", file);

    try {
      this.setState({isUploading: true});
      const result = await this.imageService.uploadImage(dataModel);
      this.setState({lastResult: result});
      if (result.succeeded) {
        this.props.dispatch(setMaxImagesCount(this.props.imageContainer.maxImagesCount + 1));
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this.setState({isUploading: false});
    }
  }
  
  createFileToUpload() {
    const dataURI = this.canvasRef.current.toDataURL();
    console.log(dataURI);
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const arr = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      arr[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

  render() {
    
    return (
      <section>
        <DrawingCanvas ref={this.canvasRef}/>
        <div>
          <UploadSummary result={this.state.lastResult} />

          <button
            className="btn btn-info mt-3"
            type="submit"
            variant="info"
            onClick={this.submit}
          >
            {/* <b-spinner v-if="isSubmitting" small type="grow" /> */}
            {this.state.submitButtonText}
          </button>
        </div>
      </section>
    );
  }
};

function mapStateToProps() {
  return (state) => {
    return { 
      imageContainer: state.image
     };
  };
}

export default connect(mapStateToProps())(Draw);
