import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/image-service/image.service';
import { PointContainerService } from 'src/app/point-container/point-container.service';

const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_B = MAX_FILE_SIZE_MB * 1024 * 1024;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  @ViewChild('fileInput') fileInput;

  useWhitelist: boolean;
  recognizeOnlyTarget: boolean;
  lastResult: ResponseImageViewModel;
  isSubmitting: boolean;
  inputLabelText: string;

  get file(): File {
    return this.fileInput.nativeElement.files[0];
  }

  get submitButtonText() {
    if (this.isSubmitting) {
      return 'Submitting...';
    } else {
      if (this.lastResult && !this.lastResult.succeeded) {
        return 'Try again';
      } else {
        return 'Submit';
      }
    }
  }

  constructor(private imageService: ImageService, private pointContainerService: PointContainerService) {
    this.inputLabelText = 'Choose a file...';
  }

  fileInputChanged() {
    this.lastResult = null;
    this.resetOptions();
    this.inputLabelText = this.file.name;
  }

  upload(file) {
    const fileRecognitionOptions = {
      recognizeOnlyTarget: this.recognizeOnlyTarget,
      whitelistDigits: this.useWhitelist
    };

    this.isSubmitting = true;
    this.imageService.uploadImage(file, fileRecognitionOptions).subscribe((result: ResponseImageViewModel) => {
      this.lastResult = result;
      if (result.succeeded) {
        this.resetOptions();
        this.pointContainerService.incrementCount();
        }
        this.isSubmitting = false;
    }, err => {
      console.warn(err);
      this.isSubmitting = false;
    });
  }

  resetOptions() {
    this.useWhitelist = false;
    this.recognizeOnlyTarget = false; 
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.file.size > MAX_FILE_SIZE_B) {
      alert(`File size exceeded! Max file size: ${MAX_FILE_SIZE_MB} MB.`);
    } else {
      this.upload(this.file);
    }
  }
}
