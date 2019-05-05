import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upload-summary',
  templateUrl: './upload-summary.component.html',
  styleUrls: ['./upload-summary.component.css']
})
export class UploadSummaryComponent {

  @Input() result: ResponseImageViewModel;

  get isRecognizedTextEmpty() {
    return !this.result.recognizedText || this.result.recognizedText === '';
  }

  get recognizedTextMessage() {
    if (this.isRecognizedTextEmpty) {
      return 'No text has been recognized.';
    } else {
      return `Recognized text: "${this.result.recognizedText}"`;
    }
  }

  get recognizedTextClass() {
    if (!this.result) {
      return '';
    } else {
      if (this.result.succeeded) {
        return 'alert-success';
      } else {
        if (this.isRecognizedTextEmpty) {
          return 'alert-warning';
        } else {
          return 'alert-danger';
        }
      }
    }
  }

}
