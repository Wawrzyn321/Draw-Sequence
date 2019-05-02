import { shallowMount } from "@vue/test-utils";
import buildLocalVue from "@TestUtility";

//CUT
import ImageCard from "@Partials/ImageCard";

//utilities
const localVue = buildLocalVue()
  .useBootstrap()
  .build();

describe("ImageCard", () => {
  it("displays badge with current number", () => {
    const wrapper = shallowMount(ImageCard, {
      localVue,
      propsData: {
        id: 5,
        url: ""
      }
    });

    const target = wrapper.find(".image-card > b-badge-stub");

    expect(target.text()).toBe("6");
  });

  it("hides image when loading", () => {
    const wrapper = shallowMount(ImageCard, {
      localVue,
      propsData: {
        id: 5,
        url: ""
      }
    });
    wrapper.setData({ isLoaded: false });

    const target = wrapper.find(".image-card > img");

    expect(target.classes()).toContain("d-none");
  });

  it("shows image when loaded", () => {
    const wrapper = shallowMount(ImageCard, {
      localVue,
      propsData: {
        id: 5,
        url: ""
      }
    });
    wrapper.setData({ isLoaded: true });

    const target = wrapper.find(".image-card > img");

    expect(target.classes()).not.toContain("d-none");
  });
});
