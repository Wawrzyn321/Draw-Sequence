import { shallowMount } from "@vue/test-utils";
import buildLocalVue from "@TestUtility";

//CUT
import SelectableImageCard from "@Partials/SelectableImageCard";

//utilities
const localVue = buildLocalVue()
  .useBootstrap()
  .build();

describe("SelectableImageCard", () => {
  it("displays badge with current number", () => {
    const wrapper = shallowMount(SelectableImageCard, {
      localVue,
      propsData: {
        id: 1,
        url: "",
        isSelected: false
      }
    });

    const target = wrapper.find(".image-card > b-badge-stub");

    expect(target.text()).toBe("2");
  });

  it("hides image when loading", () => {
    const wrapper = shallowMount(SelectableImageCard, {
      localVue,
      propsData: {
        id: 5,
        url: "",
        isSelected: false
      }
    });
    wrapper.setData({ isLoaded: false });

    const target = wrapper.find(".image-card > img");

    expect(target.classes()).toContain("d-none");
  });

  it("shows image when loaded", () => {
    const wrapper = shallowMount(SelectableImageCard, {
      localVue,
      propsData: {
        id: 5,
        url: "",
        isSelected: false
      }
    });
    wrapper.setData({ isLoaded: true });

    const target = wrapper.find(".image-card > img");

    expect(target.classes()).not.toContain("d-none");
  });

  it("applies 'dark' variant to badge when selected", () => {
    const wrapper = shallowMount(SelectableImageCard, {
      localVue,
      propsData: {
        id: 0,
        url: "",
        isSelected: true
      }
    });

    const target = wrapper.find(".image-card > b-badge-stub");

    expect(target.attributes().variant).toBe("dark");
  });

  it("applies 'info' variant to badge when not selected", () => {
    const wrapper = shallowMount(SelectableImageCard, {
      localVue,
      propsData: {
        id: 0,
        url: "",
        isSelected: false
      }
    });

    const target = wrapper.find(".image-card > b-badge-stub");

    expect(target.attributes().variant).toBe("info");
  });

  it("does not fire card-selected clicked when card is not loaded", () => {
    const wrapper = shallowMount(SelectableImageCard, {
      localVue,
      propsData: {
        id: 0,
        url: "",
        isSelected: false
      }
    });

    const target = wrapper.find(".image-card");
    target.trigger("click");

    expect(wrapper.emitted()).toEqual({});
  });

  it("fires card-selected when clicked card is loaded", () => {
    const wrapper = shallowMount(SelectableImageCard, {
      localVue,
      propsData: {
        id: 0,
        url: "",
        isSelected: false
      }
    });
    wrapper.setData({ isLoaded: true });

    const target = wrapper.find(".image-card");
    target.trigger("click");

    expect(wrapper.emitted()["card-selected"]).toBeTruthy();
  });

  it("fires card-selected with valid id", () => {
    const wrapper = shallowMount(SelectableImageCard, {
      localVue,
      propsData: {
        id: 15,
        url: "",
        isSelected: false
      }
    });
    wrapper.setData({ isLoaded: true });

    const target = wrapper.find(".image-card");
    target.trigger("click");

    expect(wrapper.emitted()["card-selected"][0][0]).toBe(15);
  });
});
