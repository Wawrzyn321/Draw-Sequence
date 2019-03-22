import { shallowMount } from "@vue/test-utils";
import buildLocalVue from "@TestUtility";

//CUT
import Draw from "@Partials/Draw";

//utilities
import imageApi from "@Api/imageApi";
jest.mock("@Api/imageApi");

const localVue = buildLocalVue()
  .useBootstrap()
  .build();

describe("Draw", () => {
  it("changes submit button text when isSubmitting is false", () => {
    const wrapper = shallowMount(Draw, {
      store: null,
      localVue
    });

    const target = wrapper.find("b-button-stub");

    wrapper.vm.isSubmitting = false;
    expect(target.text()).toBe("Submit");
  });

  it("changes submit button text when isSubmitting is true", () => {
    const wrapper = shallowMount(Draw, {
      store: null,
      localVue
    });

    const target = wrapper.find("b-button-stub");

    wrapper.vm.isSubmitting = true;
    expect(target.text()).toBe("Submitting...");
  });

  it("emits ocr-success on image upload success", async () => {
    const wrapper = shallowMount(Draw, {
      store: null,
      localVue
    });
    imageApi.uploadImage = jest.fn(() => {
      return { succeeded: true };
    });

    await wrapper.vm.upload(null);

    expect(wrapper.emitted()).toEqual({
      "ocr-success": [[{ succeeded: true }]]
    });
  });

  it("does not emit ocr-success on image upload failure", async () => {
    const wrapper = shallowMount(Draw, {
      store: null,
      localVue
    });
    imageApi.uploadImage = jest.fn(() => {
      return { succeeded: false };
    });

    await wrapper.vm.upload(null);

    expect(wrapper.emitted()).toEqual({});
  });
});
