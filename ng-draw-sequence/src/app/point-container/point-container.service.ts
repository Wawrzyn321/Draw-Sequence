import { Injectable } from '@angular/core';
import { ImageService } from '../image-service/image.service';
import { DomSanitizer } from '@angular/platform-browser';
declare var JSZip: any;

@Injectable({
  providedIn: 'root'
})
export class PointContainerService {

  private _count: number = null;
  private _cards: Array<ImageCard> = [];

  get count() {
    return this._count;
  }

  get cards() {
    return this._cards;
  }

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { }

  async updateImageCount() {
    const count = await this.imageService.getImageCount();
    if (this._count == null || this._count < count) {
      this._count = count;
    }
    return this._count;
  }

  incrementCount() {
    this._count++;
  }

  async fetchCards(offset, limit) {
    const blob =  await this.imageService.getImagesBlob(offset, limit);

    const newZip = new JSZip();
    const zip = await newZip.loadAsync(blob);

    let imageId = offset;

    const newCards = [];

    // tslint:disable-next-line:forin
    for (const filename in zip.files) {
      const content = await zip.files[filename].async('blob');
      const urlCreator = window.URL;
      let imageUrl: any = urlCreator.createObjectURL(content);
      imageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
      this._cards.push( { imageUrl, imageId, isSelected: false } );
      newCards.push( { imageUrl, imageId } );
      imageId++;
    }
    return newCards;
  }
}
