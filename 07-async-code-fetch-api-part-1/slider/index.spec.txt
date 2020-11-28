import Slider from "./index";

describe('async-code-fetch-api-part-1/slider', () => {
  let slider;

  beforeEach(() => {
    fetchMock.resetMocks();

    slider = new Slider();

    document.body.append(slider.element);
  });

  afterEach(() => {
    slider.destroy();
    slider = null;
  });

  it('element not undefined and null', () => {
    expect(slider.element).not.toBeUndefined();
    expect(slider.element).not.toBeNull();
  });

  it("should be rendered correctly", () => {
    expect(slider.element).toBeInTheDocument();
    expect(slider.element).toBeVisible();
  });

  it("should destroy event listeners after destroy component", () => {
    slider.destroy();
    const spyGetInitialPosition = jest.spyOn(slider, 'getInitialPosition');
    const spyMouseMove = jest.spyOn(slider, 'onMouseMove');
    const spyMouseUp = jest.spyOn(slider, 'onMouseUp');


    const eventPointerDown = new MouseEvent('pointerdown', {
      bubbles: true
    })

    const eventMouseMove = new MouseEvent('pointerdown', {
      bubbles: true
    })

    const eventMouseDown = new MouseEvent('pointerdown', {
      bubbles: true
    })

    slider.thumb.dispatchEvent(eventPointerDown);
    document.dispatchEvent(eventMouseMove);
    document.dispatchEvent(eventMouseDown);

    expect(spyGetInitialPosition).not.toHaveBeenCalled();
    expect(spyMouseMove).not.toHaveBeenCalled();
    expect(spyMouseUp).not.toHaveBeenCalled();
  })

  it('should not call onMouseMove and onMouseUp', () => {
    const spyMouseMove = jest.spyOn(slider, 'onMouseMove');
    const spyMouseUp = jest.spyOn(slider, 'onMouseUp');

    const move = new MouseEvent('pointermove', {
      clientX: 1,
      bubbles: true
    });

    const up = new MouseEvent('pointerup', {
      bubbles: true
    });

    document.dispatchEvent(move);
    document.dispatchEvent(up);

    expect(spyMouseMove).not.toHaveBeenCalled();
    expect(spyMouseUp).not.toHaveBeenCalled();
  });

  it('should produce event "position-changed"', () => {
    const spyDispatchEvent = jest.spyOn(slider.element, 'dispatchEvent');

    const down = new MouseEvent('pointerdown', {
      bubbles: true
    });

    const move = new MouseEvent('pointermove', {
      clientX: 1,
      bubbles: true
    });

    const up = new MouseEvent('pointerup', {
      bubbles: true
    });

    slider.thumb.dispatchEvent(down);
    document.dispatchEvent(move);
    document.dispatchEvent(up);

    const [rangeSelectEvent] = spyDispatchEvent.mock.calls;

    expect(rangeSelectEvent[0].type).toEqual("position-changed");
  });

  it('should have ability to be destroyed', () => {
    slider.destroy();

    expect(slider.element).not.toBeInTheDocument();
    expect(slider.element).toBeNull();
  });
});
