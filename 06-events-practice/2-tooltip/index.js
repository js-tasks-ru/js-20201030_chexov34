const NAME = 'tooltip';
const DEFAULT_OFFSET_TOOLTIP = 10;

class Tooltip {
  /** @type Tooltip */
  static instance;
  /** @type HTMLElement */
  element;
  onPointerOver = event => {
    const element = event.target.closest(`[data-${NAME}]`);

    if (element) {
      this.render(element.dataset.tooltip);
      this.moveToolTip({
        left: event.clientX + DEFAULT_OFFSET_TOOLTIP,
        top: event.clientY + DEFAULT_OFFSET_TOOLTIP
      });

      document.addEventListener('pointermove', this.onPointerMove);
    }
  }

  onPointerOut = () => {
    this.remove();
  }

  onPointerMove = event => {
    this.moveToolTip({
      left: event.clientX + DEFAULT_OFFSET_TOOLTIP,
      top: event.clientY + DEFAULT_OFFSET_TOOLTIP
    });
  }


  constructor() {

    if (Tooltip.instance) {
      return Tooltip.instance;
    }

    Tooltip.instance = this;
    return this;
  }

  moveToolTip({
    left = 0,
    top = 0
  }) {
    if (this.element) {
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
    }
  }

  initialize() {
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener('pointerover', this.onPointerOver);
    document.addEventListener('pointerout', this.onPointerOut);
  }

  remove() {
    if (this.element) {
      this.element.remove();
      this.element = null;

      document.removeEventListener('pointermove', this.onPointerMove);
    }
  }

  destroy() {
    document.removeEventListener('pointerover', this.onPointerMove);
    document.removeEventListener('pointerout', this.onPointerOut);
    this.remove();
  }

  render(text) {
    this.element = document.createElement('div');
    this.element.innerText = text;
    this.element.className = NAME;

    document.body.append(this.element);
  }

}

const tooltip = new Tooltip();

export default tooltip;
