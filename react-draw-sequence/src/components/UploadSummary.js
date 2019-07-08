import React from "react";

export default class UploadSummary extends React.Component {
  constructor(props) {
    super(props);

    this.isRecognizedTextEmpty = this.isRecognizedTextEmpty.bind(this);
    this.recognizedTextMessage = this.recognizedTextMessage.bind(this);
    this.recognizedTextClass = this.recognizedTextClass.bind(this);
  }

  isRecognizedTextEmpty() {
    return (
      !this.props.result.recognizedText ||
      this.props.result.recognizedText === ""
    );
  }

  recognizedTextMessage() {
    if (this.isRecognizedTextEmpty()) {
      return "No text has been recognized.";
    } else {
      return `Recognized text: "${this.props.result.recognizedText}"`;
    }
  }

  recognizedTextClass() {
    const baseClass = "alert summary-alert ";

    if (!this.props.result) {
      return baseClass;
    } else {
      if (this.props.result.succeeded) {
        return baseClass + "alert-success";
      } else {
        if (this.props.result.isRecognizedTextEmpty) {
          return baseClass + "alert-warning";
        } else {
          return baseClass + "alert-danger";
        }
      }
    }
  }

  render() {
    if (this.props.result) {
      const messages = this.props.result.errors.map((err, i) => (
        <li key={i}>{err}</li>
      ));
      return (
        <div className="mb-2 text-center">
          <ul> {messages} </ul>
          <p className={this.recognizedTextClass()}>
            {this.recognizedTextMessage()}
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}
