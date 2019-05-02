import { shallowMount } from "@vue/test-utils";
import buildLocalVue from "@TestUtility";

//CUT
import DrawingCanvas from "@Partials/DrawingCanvas";

//utilities
const localVue = buildLocalVue()
  .useBootstrap()
  .build();

describe("DrawingCanvas", () => {
  it("sets default color as drawColor", () => {
    const wrapper = shallowMount(DrawingCanvas, {
      store: null,
      localVue
    });

    expect(wrapper.vm.currentColor).toBe(wrapper.vm.drawColor);
  });

  it("resets fill color after clicking on clear button", () => {
    const wrapper = shallowMount(DrawingCanvas, {
      store: null,
      localVue
    });
    const eraseColorRadio = wrapper.findAll("b-form-radio-stub").at(1);
    const resetButton = wrapper.find("#clearButton");

    eraseColorRadio.trigger("click");
    resetButton.trigger("click");

    expect(wrapper.vm.currentColor).toBe("black");
  });
});
