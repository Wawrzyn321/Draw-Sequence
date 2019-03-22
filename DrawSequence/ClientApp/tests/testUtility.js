import { createLocalVue } from "@vue/test-utils";
import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import PageTitle from "@Partials/PageTitle";

function buildLocalVue() {
  class LocalVueBuilder {
    constructor() {
      this.localVue = createLocalVue();
    }

    useBootstrap() {
      this.localVue.use(BootstrapVue);
      return this;
    }

    useVuex() {
      this.localVue.use(Vuex);
      return this;
    }

    useRouter() {
      // we could also use
      // stubs: {
      //   RouterLink: RouterLinkStub
      // }
      this.localVue.use(VueRouter);
      return this;
    }

    withPageTitle() {
      this.localVue.component("page-title", PageTitle);
      return this;
    }

    build() {
      return this.localVue;
    }
  }
  return new LocalVueBuilder();
}

export default buildLocalVue;
