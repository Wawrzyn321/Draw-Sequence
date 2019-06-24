import React from "react";
import DrawingCanvas from "./DrawingCanvas";

export default class Draw extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      lastResult: null,
      submitButtonText: "Submit"
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
        <DrawingCanvas />
        <div>
          {/* <upload-summary :result="lastResult"></upload-summary> */}

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
