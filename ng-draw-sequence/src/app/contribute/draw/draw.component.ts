import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/core/image-service/image.service';
import { PointContainerService } from 'src/app/point-container/point-container.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent {

  lastResult: ResponseImageViewModel;
  isSubmitting: boolean;

  get submitButtonText(): string {
    return this.isSubmitting ? 'Submitting...' : 'Submit';
  }

  constructor(private imageService: ImageService, private pointContainerService: PointContainerService) { }

  upload(file) {
    this.isSubmitting = true;
    this.imageService.uploadImage(file, {}).subscribe((result: ResponseImageViewModel) => {
      this.lastResult = result;
      if (result.succeeded) {
        this.pointContainerService.incrementCount();
      }
      this.isSubmitting = false;
    }, err => {
      console.warn(err);
      this.isSubmitting = false;
    });
  }

  onSubmit() {
    const file = this.createFileToUpload();
    this.upload(file);
  }

  createFileToUpload() {
    const dataURI = document.querySelector('canvas').toDataURL();
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const arr = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      arr[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }
}
