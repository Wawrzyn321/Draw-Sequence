import { Component, ViewChild } from '@angular/core';
import { PointContainerService } from 'src/app/point-container/point-container.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-counting-list',
  templateUrl: './counting-list.component.html',
  styleUrls: ['./counting-list.component.css']
})
export class CountingListComponent {

  @ViewChild('container') container;

  scrollCooldown = false;
  loadCooldownTime = 850;
  visibleCards = [];
  maxElements = 0;
  isLoading = true;
  initialCardsCount = 12;
  cardsIncrement = 6;

  constructor(private pointContainerService: PointContainerService, private router: Router) {
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
}
