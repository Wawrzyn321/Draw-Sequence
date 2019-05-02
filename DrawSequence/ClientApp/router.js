import Vue from "vue";
import VueRouter from "vue-router";

import CountingList from "@Pages/CountingList";
import Increment from "@Pages/Increment";
import About from "@Pages/About";
import AdminLogin from "@Pages/AdminLogin";
import Admin from "@Pages/Admin";

import store from "./store/store";

Vue.use(VueRouter);

function isAuthenticated() {
  return store.getters.isAuthenticated;
}

const routes = [
  { path: "/counter", component: CountingList },
  { path: "/add", component: Increment },
  { path: "/about", component: About },
  {
    path: "/login",
    component: AdminLogin,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next({ path: "/admin" });
        return;
      }
      next();
    }
  },
  {
    path: "/admin",
    component: Admin,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next({ path: "/login" });
        return;
      }
      next();
    }
  },

  { path: "*", component: CountingList },
  { path: "/", redirect: "/counter" }
];

export default new VueRouter({
  linkActiveClass: "active",
  mode: "history",
  routes: routes
});
