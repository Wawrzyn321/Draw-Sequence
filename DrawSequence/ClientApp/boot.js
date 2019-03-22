import Vue from "vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import store from "./store/store";
import pageTitle from "@Partials/PageTitle";

import "babel-polyfill";

Vue.use(BootstrapVue);
Vue.component("page-title", pageTitle);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@Styles/style.css";

// ReSharper disable once ConstructorCallNotUsed
new Vue({
  el: "#app-root",
  store,
  router,
  render: h => h(require("./App.vue"))
});
