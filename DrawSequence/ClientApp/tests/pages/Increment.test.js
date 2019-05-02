import { shallowMount } from "@vue/test-utils";
import buildLocalVue from "@TestUtility";

//CUT
import Increment from "@Pages/Increment";

const localVue = buildLocalVue()
  .useBootstrap()
  .withPageTitle()
  .build();

describe("Increment", () => {
  it("displays count as ellipsis when count is null", () => {
    const wrapper = shallowMount(Increment, {
      localVue
    });
    wrapper.setData({
      count: null
    });

    const target = wrapper.findAll("p").at(1);

    expect(target.text()).toBe("Next number to draw: ...");
  });

  it("displays count when count is a number", () => {
    const wrapper = shallowMount(Increment, {
      localVue
    });
    wrapper.setData({
      count: 5
    });

    const target = wrapper.findAll("p").at(1);

    expect(target.text()).toBe("Next number to draw: 6.");
  });
});
