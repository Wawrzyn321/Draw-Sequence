import { shallowMount } from "@vue/test-utils";
import buildLocalVue from "@TestUtility";
import Vuex from "vuex";

//CUT
import Footer from "@Partials/Footer";

//utilities
const localVue = buildLocalVue()
  .useVuex()
  .useBootstrap()
  .useRouter()
  .build();

describe("Footer", () => {
  it("displays login link when not authenticated", () => {
    const store = new Vuex.Store({
      getters: {
        isAuthenticated: () => false
      }
    });

    const wrapper = shallowMount(Footer, {
      store,
      localVue
    });

    const target = wrapper.find(".container > router-link-stub");

    expect(target.text()).toBe("Admin Login");
  });

  it("displays admin panel link when authenticated", () => {
    const store = new Vuex.Store({
      getters: {
        isAuthenticated: () => true
      }
    });

    const wrapper = shallowMount(Footer, {
      store,
      localVue
    });

    const target = wrapper.find(".container router-link-stub");

    expect(target.text()).toBe("Admin Panel");
  });

  it("displays logout link when authenticated", () => {
    const store = new Vuex.Store({
      getters: {
        isAuthenticated: () => true
      }
    });

    const wrapper = shallowMount(Footer, {
      store,
      localVue
    });

    const target = wrapper.find(".container b-link-stub");

    expect(target.text()).toBe("Log out");
  });
});
