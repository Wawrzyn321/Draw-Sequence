<template>
  <article>
    <page-title title="Admin Login"></page-title>
    <h2>Admin Login</h2>
    <b-form @submit="submitLogin" ref="login-form">
      <b-form-group label="Administrator login">
        <b-form-input
          name="username"
          placeholder="Administrator login"
          v-model="username"
          required
        />
      </b-form-group>

      <b-form-group label="Password">
        <b-form-input
          name="password"
          placeholder="Password"
          v-model="password"
          type="password"
          required
        />
      </b-form-group>

      <b-button
        type="submit"
        variant="info"
        class="btn btn-primary"
        :disabled="isLoading"
      >
        <b-spinner v-if="isLoading" small type="grow" />
        {{ loginButtonText }}
      </b-button>

      <b-alert variant="danger" show v-if="loginError" class="mt-3">{{
        loginError
      }}</b-alert>
    </b-form>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import { AUTH_REQUEST } from "./../store/mutations";

export default {
  data: function() {
    return {
      username: "",
      password: "",
      loginError: ""
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    isLoading: function() {
      return this.authStatus === "loading";
    },
    loginButtonText: function() {
      return this.isLoading ? "Logging in..." : "Log in";
    }
  },
  methods: {
    async submitLogin(e) {
      e.preventDefault();
      const loginData = new FormData(this.$refs["login-form"]);
      await this.$store.dispatch(AUTH_REQUEST, loginData);
      if (this.isAuthenticated) {
        this.$router.push("/admin");
      } else {
        this.loginError = "Invalid username or password!";
      }
    }
  },
  activated() {
    this.loginError = "";
  }
};
</script>

<style scoped>
form {
  max-width: 450px;
}
</style>
