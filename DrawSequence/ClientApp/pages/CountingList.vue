<template>
  <article>
    <page-title title="List"></page-title>
    <h2>Counting list</h2>
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
      ></li>
    </ul>
    <p v-else>
      There is nothing there now, why don't you check out the
      <router-link to="/add">Contribute</router-link> tab?
    </p>
  </article>
</template>

<script>
import DynamicList from "@Base/DynamicList";
import ImageCard from "@Partials/ImageCard";

export default {
  data: function() {
    return {
      initialCardsCount: 12,
      cardsIncrement: 6
    };
  },
  methods: {
    createCard(imageUrl, index) {
      return { imageUrl, index };
    }
  },
  components: {
    card: ImageCard
  },
  extends: DynamicList
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
}
</style>
