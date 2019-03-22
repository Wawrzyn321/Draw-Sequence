<template>
  <footer class="footer mt-auto py-3">
    <div class="container">
      <router-link
        v-if="!isAuthenticated"
        to="/login"
        class="d-block text-center"
        >Admin Login</router-link
      >
      <div v-else class="text-center">
        <router-link to="/admin">Admin Panel</router-link>
        <b-link @click="logout">Log out</b-link>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { AUTH_LOGOUT } from "../store/mutations";

export default {
  methods: {
    ...mapActions(["logOut"]),
    async logout() {
      try {
        await this.$store.dispatch(AUTH_LOGOUT);
        this.changePageIfOnAdminPanel();
      } catch (err) {
        console.warn(err);
      }
    },
    changePageIfOnAdminPanel() {
      if (this.$router.currentRoute.path === "/admin") {
        this.$router.push({ path: "/counter" });
      }
    }
  },
  computed: mapGetters(["isAuthenticated"])
};
</script>
