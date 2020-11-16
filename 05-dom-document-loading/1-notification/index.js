function createElementFromString(string) {
  const div = document.createElement("div");
  div.innerHTML = string.trim();
  return div.firstElementChild;
}

export default class NotificationMessage {
  /** @type Node */
  static element;
  /** @type Number */
  static #_timer;
  constructor(
    message,
    { duration = 1000, type = "success", header = "Success" } = {}
  ) {
    this.duration = duration;
    this.type = type;
    this.message = message;
    this.header = header;
    this.render();
  }

  get template() {
    return `
    <div class="notification ${this.type}" style="--value:${
      this.duration / 1000
    }s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">${this.header}</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>
  `;
  }

  get element() {
    return NotificationMessage.element;
  }

  set element(element) {
    NotificationMessage.element = element;
  }

  render() {
    this.destroy();
    this.element = createElementFromString(this.template);
  }

  show(root = document.body) {
    root.append(this.element);
    NotificationMessage.#_timer = setTimeout(
      () => this.destroy(),
      this.duration
    );
  }

  destroy() {
    this.remove();
    clearTimeout(NotificationMessage.#_timer);
    this.element = null; // <-- в тестах не хватает проверки на null, т.е. если remove, то в памяти всё равно есть ссылка
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
}
