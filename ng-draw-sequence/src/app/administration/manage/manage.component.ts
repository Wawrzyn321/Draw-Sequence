import { Component, ViewChild } from '@angular/core';
import { PointContainerService } from 'src/app/point-container/point-container.service';
import { Router, NavigationEnd } from '@angular/router';
import { ImageService } from 'src/app/core/image-service/image.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent  {

  @ViewChild('container') container;

  scrollCooldown = false;
  loadCooldownTime = 850;
  visibleCards = [];
  maxElements = 0;
  isLoading = true;
  initialCardsCount = 16;
  cardsIncrement = 10;
  selectedIndex: number = null;

  constructor(private imageService: ImageService, private pointContainerService: PointContainerService, private router: Router) {
    router.events.subscribe(eventType => {
      if (eventType instanceof NavigationEnd) {
        this.activated();
      }
    });
  }

  async handleScroll() {
    const elementsLeftCount = this.maxElements - this.visibleCards.length;

    if (elementsLeftCount === 0 || this.scrollCooldown) {
      return;
    }
    const e = this.container.nativeElement;
    const isOnBottom = e.scrollTop === e.scrollHeight - e.clientHeight;

    if (isOnBottom) {
      const cardsToAdd = Math.min(this.cardsIncrement, elementsLeftCount);
      try {
        const newCards = await this.pointContainerService.fetchCards(this.visibleCards.length, this.visibleCards.length + cardsToAdd);
        this.visibleCards = this.visibleCards.concat(newCards);
        this.isLoading = false;
      } catch (err) {
        console.warn(err);
        this.isLoading = false;
      }
    }
  }

  async activated() {
    const count = await this.pointContainerService.updateImageCount();
    if (count < this.visibleCards.length) {
      this.visibleCards = this.visibleCards.splice(0, count);
      this.maxElements = count;
      this.isLoading = false;
    } else if (count !== this.maxElements) {
      const cardsToAdd = Math.min(count - this.visibleCards.length, this.initialCardsCount);
      try {
        const newCards = await this.pointContainerService.fetchCards(this.visibleCards.length, this.visibleCards.length + cardsToAdd);
        this.visibleCards = this.visibleCards.concat(newCards);
        this.maxElements = count;
        this.isLoading = false;
      } catch (err) {
        console.warn(err);
        this.isLoading = false;
      }
    }
  }

  createCard(imageUrl, index) {
    const isSelected =
      this.selectedIndex === null ? false : this.selectedIndex <= index;
    return { imageUrl, index, isSelected };
  }

  cardSelected(index) {
    if (this.selectedIndex == null) {
      for (let i = index; i < this.visibleCards.length; i++) {
        this.visibleCards[i].isSelected = true;
      }
      this.selectedIndex = index;
    } else {
      if (this.visibleCards[index].isSelected) {
        for (let i = this.selectedIndex; i <= index; i++) {
          this.visibleCards[i].isSelected = false;
        }
        if (index + 1 === this.visibleCards.length) {
          this.selectedIndex = null;
        } else {
          this.selectedIndex = index + 1;
        }
      } else {
        for (let i = this.selectedIndex; i <= index; i++) {
          this.visibleCards[i].isSelected = false;
        }
        for (let i = index; i <= this.selectedIndex; i++) {
          this.visibleCards[i].isSelected = true;
        }
        this.selectedIndex = index;
      }
    }
  }

  async deleteSelected() {
    if (this.selectedIndex === null) {
      return;
    }

    const result = await this.imageService.deleteImages(this.selectedIndex);
    if (result) {
      this.removeImagesFromSelectedIndex();
    } else {
      console.warn('Could not delete images');
    }
  }

  removeImagesFromSelectedIndex() {
    this.visibleCards = this.visibleCards.splice(0, this.selectedIndex);
    this.selectedIndex = null;
  }
}
