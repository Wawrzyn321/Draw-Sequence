import React from "react";
import UploadSummary from "./UploadSummary";
import { setMaxImagesCount } from "./../actions/imageActions";
import { connect } from "react-redux";
import { ImageService } from "./../services/image";

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_B = MAX_FILE_SIZE_MB * 1024 * 1024;

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      lastResult: null,
      submitButtonText: "Submit",
      file: null,
      useWhiteList: false,
      recognizeOnlyTarget: false
    };

    this.imageService = new ImageService();

    this.submit = this.submit.bind(this);
    this.fileInputChanged = this.fileInputChanged.bind(this);
  }

  fileInputChanged(e) {
    this.setState({ file: e.target.files[0] });
    this.setState({ lastResult: null });
    this.resetOptions();
  }

  resetOptions() {
    this.setState({
      useWhiteList: false,
      recognizeOnlyTarget: false
    });
  }

  async submit(e) {
    e.preventDefault();
    if (this.state.file.size > MAX_FILE_SIZE_B) {
      alert(`File size exceeded! Max file size: ${MAX_FILE_SIZE_MB} MB.`);
      this.setState({ file: null });
    } else {
      await this.upload(this.state.file);
    }
  }

  async upload(file) {
    const dataModel = new FormData();
    dataModel.append("file", file);
    const params = {
      recognizeOnlyTarget: this.state.recognizeOnlyTarget,
      whitelistDigits: this.state.useWhiteList
    };

    try {
      this.setState({ isUploading: true });
      const result = await this.imageService.uploadImage(dataModel, params);
      this.setState({ lastResult: result });
      if (result.succeeded) {
        this.resetOptions();
        this.props.dispatch(
          setMaxImagesCount(this.props.imageContainer.maxImagesCount + 1)
        );
      }
    } catch (err) {
      console.warn(err);
    } finally {
      this.setState({ isUploading: false });
    }
  }

  submitButtonText() {
    if (this.isSubmitting) {
      return "Submitting...";
    } else {
      if (this.lastResult && !this.lastResult.succeeded) {
        return "Try again";
      } else {
        return "Submit";
      }
    }
  }

  render() {
    return (
      <section>
        <form
          method="POST"
          encType="multipart/form-data"
          className="m2 file-input-form"
        >
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="validatedCustomFile"
              required
              onChange={this.fileInputChanged}
              accept="image/*"
            />

            {!this.state.file && (
              <label className="custom-file-label">Choose a file...</label>
            )}
            {this.state.file && (
              <label className="custom-file-label">
                {this.state.file.name}
              </label>
            )}
            <div className="invalid-feedback">
              Example invalid custom file feedback
            </div>
          </div>
        </form>
        <UploadSummary result={this.state.lastResult} />
        {this.state.lastResult && !this.state.lastResult.succeeded && (
          <section className="my-3 mb-2 text-center" v-if="lastResult && !lastResult.succeeded">
            <h5>Advanced options</h5>
            <input type="checkbox" v-model="useWhiteList" />
            <label htmlFor="checkbox">Recognize only numbers</label>
            <br />
            <input type="checkbox" v-model="recognizeOnlyTarget" />
            <label htmlFor="checkbox">
              Try to recognize only target number
            </label>
          </section>
        )}
        <button
          className="btn btn-info"
          type="submit"
          variant="info"
          onClick={this.submit}
          disabled={!this.state.file}
        >
          {/* <spinner v-if="isSubmitting" small type="grow" /> */}
          {this.state.submitButtonText}
        </button>
      </section>
    );
  }
}

function mapStateToProps() {
  return state => {
    return {
      imageContainer: state.image
    };
  };
}

export default connect(mapStateToProps())(Upload);
