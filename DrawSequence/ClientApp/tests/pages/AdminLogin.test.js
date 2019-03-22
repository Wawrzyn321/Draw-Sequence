import { shallowMount } from "@vue/test-utils";
import buildLocalVue from "@TestUtility";
import Vuex from "vuex";

//CUT
import AdminLogin from "@Pages/AdminLogin";

const localVue = buildLocalVue()
  .useVuex()
  .useBootstrap()
  .withPageTitle()
  .build();

describe("AdminLogin", () => {
  it("displays valid button text while logging in", () => {
    const store = new Vuex.Store({
      getters: {
        authStatus: () => "loading"
      }
    });

    const wrapper = shallowMount(AdminLogin, {
      store,
      localVue
    });

    const target = wrapper.find("b-button-stub[type='submit']");

    expect(target.text()).toBe("Logging in...");
  });

  it("displays valid button text when not logging in", () => {
    const store = new Vuex.Store({
      getters: {
        authStatus: () => ""
      }
    });

    const wrapper = shallowMount(AdminLogin, {
      store,
      localVue
    });

    const target = wrapper.find("b-button-stub[type='submit']");

    expect(target.text()).toBe("Log in");
  });
});
