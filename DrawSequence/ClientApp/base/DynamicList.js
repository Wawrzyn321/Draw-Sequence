import imageApi from "@Api/imageApi";
import JSZip from "JSZIP";
import _ from "lodash";

export default {
  data: function() {
    return {
      scrollCooldown: false,
      loadCooldownTime: 850,
      visibleCards: [],
      maxElements: 0,
      isLoading: true,
      scrollHandler: _.throttle(this.handleScroll, 250)
    };
  },
  methods: {
    async fetchCards(offset, limit) {
      try {
        const blob = await imageApi.getImagesBlob(offset, limit);

        const newZip = new JSZip();
        const zip = await newZip.loadAsync(blob);

        let index = offset;
        for (const filename in zip.files) {
          const content = await zip.files[filename].async("blob");
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(content);
          this.visibleCards.push(this.createCard(imageUrl, index));
          index++;
        }
      } catch (err) {
        console.warn(err);
      }
    },
    async handleScroll() {
      const elementsLeftCount = this.maxElements - this.visibleCards.length;

      if (elementsLeftCount === 0 || this.scrollCooldown) {
        return;
      }

      const e = this.$refs.container;
      const isOnBottom = e.scrollTop === e.scrollHeight - e.clientHeight;

      if (isOnBottom) {
        const cardsToAdd = Math.min(this.cardsIncrement, elementsLeftCount);
        await this.addCards(cardsToAdd, true);
      }
    },
    async addCards(cardsToAdd, wasScrolled = false) {
      if (cardsToAdd < 0) {
        throw new Error("negative cards to add: " + cardsToAdd);
      }

      await this.fetchCards(
        this.visibleCards.length,
        this.visibleCards.length + cardsToAdd
      );

      this.scrollCooldown = true;
      setTimeout(() => {
        this.scrollCooldown = false;
        if (wasScrolled) {
          this.handleScroll();
        }
      }, this.loadCooldownTime);
    }
  },
  async activated() {
    try {
      const count = await imageApi.getImageCount();
      if (count < this.visibleCards.length) {
        this.visibleCards = this.visibleCards.splice(0, count);
        this.maxElements = count;
      } else if (count != this.maxElements) {
        const cardsToAdd = Math.min(
          count - this.visibleCards.length,
          this.initialCardsCount
        );
        await this.addCards(cardsToAdd);
        this.maxElements = count;
      }
      this.isLoading = false;
    } catch (err) {
      console.warn(err);
    }
  }
};
