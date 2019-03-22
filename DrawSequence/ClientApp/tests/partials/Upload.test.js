import { shallowMount } from "@vue/test-utils";
import buildLocalVue from "@TestUtility";

//CUT
import Upload from "@Partials/Upload";

//utilities
import imageApi from "@Api/imageApi";
jest.mock("@Api/imageApi");

const localVue = buildLocalVue()
  .useBootstrap()
  .build();

describe("Upload", () => {
  it("changes submit button text when isSubmitting is false and last submit succeeded", () => {
    const wrapper = shallowMount(Upload, {
      store: null,
      localVue
    });
    wrapper.setData({
      isSubmitting: false,
      lastResult: {
        succeeded: false
      }
    });

    const target = wrapper.find("b-button-stub");

    expect(target.text()).toBe("Try again");
  });

  it("changes submit button text when isSubmitting is false and last submit failed", () => {
    const wrapper = shallowMount(Upload, {
      store: null,
      localVue
    });
    wrapper.setData({
      isSubmitting: false,
      lastResult: {
        succeeded: true
      }
    });

    const target = wrapper.find("b-button-stub");

    expect(target.text()).toBe("Submit");
  });

  it("changes submit button text when isSubmitting is true", () => {
    const wrapper = shallowMount(Upload, {
      store: null,
      localVue
    });
    wrapper.setData({
      isSubmitting: true
    });

    const target = wrapper.find("b-button-stub");

    expect(target.text()).toBe("Submitting...");
  });

  it("emits ocr-success on image upload success", async () => {
    const wrapper = shallowMount(Upload, {
      store: null,
      localVue
    });
    imageApi.uploadImage = jest.fn(() => {
      return { succeeded: true };
    });

    await wrapper.vm.upload(null);

    expect(wrapper.emitted()["ocr-success"]).toBeTruthy();
  });

  it("does not emit ocr-success on image upload failuer", async () => {
    const wrapper = shallowMount(Upload, {
      store: null,
      localVue
    });
    imageApi.uploadImage = jest.fn(() => {
      return { succeeded: false };
    });

    await wrapper.vm.upload(null);

    expect(wrapper.emitted()).toEqual({});
  });

  it("shows advanced options when last result is failed", () => {
    const wrapper = shallowMount(Upload, {
      store: null,
      localVue
    });
    wrapper.setData({
      lastResult: { succeeded: false }
    });

    const target = wrapper.find("section");

    expect(target.isVisible()).toEqual(true);
  });

  it("does not show advanced options when last result has succeeded", () => {
    const wrapper = shallowMount(Upload, {
      store: null,
      localVue
    });
    wrapper.setData({
      lastResult: { succeeded: true }
    });

    const target = wrapper.find("section");

    expect(target.exists()).toBeFalsy();
  });

  it("does not show advanced options when there is no results yet", () => {
    const wrapper = shallowMount(Upload, {
      store: null,
      localVue
    });
    wrapper.setData({
      lastResult: null
    });

    const target = wrapper.find("section");

    expect(target.exists()).toBeFalsy();
  });
});
