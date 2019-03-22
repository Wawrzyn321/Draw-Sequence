<template>
  <div class="main-container">
    <header>
      <navigation></navigation>
    </header>
    <main>
      <keep-alive>
        <router-view class="m-3"></router-view>
      </keep-alive>
      <foot></foot>
    </main>
  </div>
</template>

<script>
import Navigation from "@Partials/Navigation";
import Footer from "@Partials/Footer";

export default {
  name: "app",
  components: {
    navigation: Navigation,
    foot: Footer
  }
};
</script>

<style>
.main-container {
  max-width: 800px;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: calc(100vh - 65px);
}
</style>
