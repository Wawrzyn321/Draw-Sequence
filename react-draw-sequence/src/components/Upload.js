import React from "react";

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      lastResult: null,
      submitButtonText: "Submit",
      file: null
    };
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    console.log(e);
  }

  render() {
    return (
      <section>
        <form method="POST" encType="multipart/form-data" className="m2 file-input-form">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="validatedCustomFile"
              required
              onChange={this.fileInputChanged}
              accept="image/*"
            />
            <label className="custom-file-label" htmlFor="validatedCustomFile">
              Choose a file...
            </label>
            <div className="invalid-feedback">
              Example invalid custom file feedback
            </div>
          </div>
        </form>
        {/* <upload-summary :result="lastResult"></upload-summary> */}
        {this.state.lastResult && !this.state.lastResult.succeeded && (
          <section className="my-3" v-if="lastResult && !lastResult.succeeded">
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
          disabled="!file"
        >
          {/* <spinner v-if="isSubmitting" small type="grow" /> */}
          {this.state.submitButtonText}
        </button>
      </section>
    );
  }
}
