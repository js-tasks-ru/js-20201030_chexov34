export default class NotificationMessage {
  static _element;
  static _timer;
  constructor(message, { duration = 1000, type = "success" } = {}) {
    this.duration = duration;
    this.type = type;
    this.message = message;
    this.render();
  }

  static createElementFromString(string) {
    const div = document.createElement("div");
    div.innerHTML = string.trim();
    return div.firstChild;
  }

  get template() {
    return NotificationMessage.createElementFromString(`
    <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
    <div class="timer"></div>
    <div class="inner-wrapper">
      <div class="notification-header">success</div>
      <div class="notification-body">
        ${this.message}
      </div>
    </div>
  </div>
  `);
  }

  get element() {
    return NotificationMessage._element;
  }

  set element(element) {
    NotificationMessage._element = element;
  }

  render() {
    this.destroy();
    this.element = this.template;
  }

  show(root = null) {
    if (root) {
      root.append(this.element);
    } else {
      document.body.append(this.element);
    }
    NotificationMessage._timer = setTimeout(
      () => this.destroy(),
      this.duration
    );
  }

  destroy() {
    this.remove();
    clearTimeout(NotificationMessage._timer);
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
}
