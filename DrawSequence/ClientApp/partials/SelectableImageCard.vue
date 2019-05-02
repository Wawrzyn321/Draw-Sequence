<template>
  <div class="image-card" @click="cardSelected">
    <b-badge type="dark" :variant="badgeVariant">{{ id + 1 }}</b-badge>
    <img :class="{ 'd-none': !isLoaded }" :src="url" @load="loaded" />
    <loading-spinner :isLoading="!isLoaded" />
  </div>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner";

export default {
  data: function() {
    return {
      isLoaded: false
    };
  },
  computed: {
    badgeVariant: function() {
      return this.isSelected ? "dark" : "info";
    }
  },
  methods: {
    loaded: function() {
      this.isLoaded = true;
    },
    cardSelected: function() {
      if (!this.isLoaded) {
        return;
      }
      this.$emit("card-selected", this.id);
    }
  },
  components: {
    "loading-spinner": LoadingSpinner
  },
  props: {
    id: {
      required: true,
      type: Number
    },
    url: {
      required: true,
      type: String
    },
    isSelected: {
      required: true,
      type: Boolean
    }
  }
};
</script>

<style scoped src="@Styles/image-card.css"></style>
<style scoped>
.image-card {
  cursor: pointer;
}
</style>
