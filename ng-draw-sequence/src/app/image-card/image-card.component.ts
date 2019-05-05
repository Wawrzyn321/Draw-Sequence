import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li.image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent {

  @Input() imageId: number;
  @Input() imageUrl: string;
  @Input() isSelected: boolean;

  @Output() cardClicked = new EventEmitter<Number>();

  isLoaded = false;

  get backgroundColor() {
    return this.isSelected ? '#343A40 ' : '#17A2B8';
  }

  constructor() { }

  loaded() {
    this.isLoaded = true;
  }

  clicked() {
    this.cardClicked.emit(this.imageId);
  }
}
