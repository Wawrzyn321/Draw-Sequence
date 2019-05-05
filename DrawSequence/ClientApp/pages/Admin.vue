<template>
  <article>
    <page-title title="Admin Panel"></page-title>
    <h2>Admin</h2>
    <b-button
      variant="info"
      :disabled="selectedIndex === null"
      @click="deleteSelected"
      >Delete selected images</b-button
    >
    <p v-if="isLoading">Loading...</p>
    <ul
      v-else-if="visibleCards.length"
      class="list-container"
      ref="container"
      @scroll="scrollHandler"
    >
      <li
        v-for="img in visibleCards"
        :key="img.index"
        is="card"
        :id="img.index"
        :url="img.imageUrl"
        :isSelected="img.isSelected"
        @card-selected="cardSelected"
      ></li>
    </ul>
    <p v-else>No images.</p>
  </article>
</template>

<script>
import DynamicList from "@Base/DynamicList";
import SelectableImageCard from "@Partials/SelectableImageCard";
import imageApi from "../api/imageApi";

export default {
  extends: DynamicList,
  data: function() {
    return {
      initialCardsCount: 16,
      cardsIncrement: 10,
      selectedIndex: null
    };
  },
  methods: {
    createCard(imageUrl, index) {
      const isSelected =
        this.selectedIndex === null ? false : this.selectedIndex <= index;
      return { imageUrl, index, isSelected };
    },
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
    },
    async deleteSelected() {
      if (this.selectedIndex === null) {
        return;
      }

      try {
        const result = await imageApi.deleteImages(
          this.selectedIndex,
          this.$store.state.token
        );
        if (result) {
          this.removeImages();
        } else {
          console.warn("Could not delete images:");
          console.warn(result);
        }
      } catch (err) {
        console.warn(err);
      }
    },
    removeImages() {
      this.visibleCards = this.visibleCards.splice(0, this.selectedIndex);
      this.selectedIndex = null;
    }
  },
  components: {
    card: SelectableImageCard
  }
};
</script>

<style scoped>
.list-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  padding: 0;
  max-height: 600px;
  overflow: auto;
  justify-content: center;
  width: 770px;
}
</style>
