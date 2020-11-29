function createElementFromString(string) {
  const div = document.createElement("div");
  div.innerHTML = string.trim();
  return div.firstElementChild;
}

export default class RangePicker {
  element;
  subElements = {};
  static RANGEPICKER_OPEN = 'rangepicker_open';

  constructor({
    from = new Date(),
    to = new Date()
  }) {
    this.from = from;
    this.to = to;
    this.render();
  }

  render() {
    this.element = createElementFromString(this.tmaplte);
    this.subElements = this.getSubElements(this.element);
    this.initEventListeners();
  }

  static formatDate(date) {
    return new Intl.DateTimeFormat().format(date);
  }

  get tmaplte() {
    const from = RangePicker.formatDate(this.from);
    const to = RangePicker.formatDate(this.to);
    return `
        <div class="rangepicker">
            <div class="rangepicker__input" data-element="input">
                <span data-element="from">${from}</span> -
                <span data-element="to">${to}</span>
            </div>
            <div class="rangepicker__selector" data-element="selector">
                <div class="rangepicker__selector-arrow"></div>
                <div class="rangepicker__selector-control-left"></div>
                <div class="rangepicker__selector-control-right"></div>
            </div>
            ${this.templateCalendar}
        </div>
        `
  }

  get templateCalendar() {
    const monthEn = this.from.toLocaleString('en', {
      month: 'long'
    });;
    return `
        <div class="rangepicker__calendar">
        <div class="rangepicker__month-indicator">
          <time datetime="${monthEn}">${monthEn}</time>
        </div>
        <div class="rangepicker__day-of-week"><div>Пн</div><div>Вт</div><div>Ср</div><div>Чт</div><div>Пт</div><div>Сб</div><div>Вс</div></div>
        <div class="rangepicker__date-grid">
          <button type="button" class="rangepicker__cell" data-value="2019-11-01T17:53:50.338Z" style="--start-from: 5">1</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-02T17:53:50.338Z">2</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-03T17:53:50.338Z">3</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-04T17:53:50.338Z">4</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-05T17:53:50.338Z">5</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-06T17:53:50.338Z">6</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-07T17:53:50.338Z">7</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-08T17:53:50.338Z">8</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-09T17:53:50.338Z">9</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-10T17:53:50.338Z">10</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-11T17:53:50.338Z">11</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-12T17:53:50.338Z">12</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-13T17:53:50.338Z">13</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-14T17:53:50.338Z">14</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-15T17:53:50.338Z">15</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-16T17:53:50.338Z">16</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-17T17:53:50.338Z">17</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-18T17:53:50.338Z">18</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-19T17:53:50.338Z">19</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-20T17:53:50.338Z">20</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-21T17:53:50.338Z">21</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-22T17:53:50.338Z">22</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-23T17:53:50.338Z">23</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-24T17:53:50.338Z">24</button>
          <button type="button" class="rangepicker__cell" data-value="2019-11-25T17:53:50.338Z">25</button>
          <button type="button" class="rangepicker__cell rangepicker__selected-from"
                  data-value="2019-11-26T17:53:50.338Z">26
          </button>
          <button type="button" class="rangepicker__cell rangepicker__selected-between"
                  data-value="2019-11-27T17:53:50.338Z">27
          </button>
          <button type="button" class="rangepicker__cell rangepicker__selected-between"
                  data-value="2019-11-28T17:53:50.338Z">28
          </button>
          <button type="button" class="rangepicker__cell rangepicker__selected-between"
                  data-value="2019-11-29T17:53:50.338Z">29
          </button>
          <button type="button" class="rangepicker__cell rangepicker__selected-between"
                  data-value="2019-11-30T17:53:50.338Z">30
          </button>
        </div>
      </div>
        `
  }

  tooglePicker() {
    if (!this.element) return;
    if (this.element.classList.contains(RANGEPICKER_OPEN)) {
      this.element.classList.remove(RANGEPICKER_OPEN);
    } else {
      this.element.classList.add(RANGEPICKER_OPEN);
    }
  }

  getSubElements(element) {
    const elements = element.querySelectorAll("[data-element]");

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  initEventListeners() {

  }

  destroy() {
    this.remove();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
    this.element = null;
  }

}
