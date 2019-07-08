<template>
  <ul class="image-card"><!-- todo why ul? -->
    <b-badge type="dark" variant="info">{{ id + 1 }}</b-badge>
    <img :class="{ 'd-none': !isLoaded }" :src="url" @load="loaded" />
    <loading-spinner :isLoading="!isLoaded" />
  </ul>
</template>

<script>
import LoadingSpinner from "./LoadingSpinner";

/*
NOTE: we cannot use v-if and v-else instead of binding d-none classes, because
image disabled with v-if would never load
*/

export default {
  data: function() {
    return {
      isLoaded: false
    };
  },
  methods: {
    loaded: function() {
      this.isLoaded = true;
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
    }
  }
};
</script>

<style scoped src="@Styles/image-card.css"></style>
