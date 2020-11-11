export default class ColumnChart {
  chartHeight = 50;

  constructor({ data = [], label = "", value = 0, link = "#" } = {}) {
    this.data = data;
    this.label = label;
    this.value = value;
    this.link = link;
    this.render();
  }

  renderLink() {
    return !!this.link
      ? `<a class="column-chart__link" href="${this.link}">View all</a>`
      : "";
  }

  isLoading() {
    return !!this.data.length;
  }

  renderTitle() {
    const title = `Total ${this.label.charAt(0) + this.label.slice(1)}`;
    return `
     <div class="column-chart__title">
      ${title}
      ${this.renderLink()}
     </div>
    `;
  }

  renderHeader() {
    return !!this.value
      ? `
    <div data-element="header" class="column-chart__header">
      ${this.value}
    </div>
    `
      : "";
  }

  renderData() {
    if (!this.data || !this.data.length) return "";

    const maxValue = Math.max(...this.data);
    const scale = this.chartHeight / maxValue;

    return this.data
      .map((item) => {
        const percent = ((item / maxValue) * 100).toFixed();
        const value = Math.floor(item * scale);
        return `<div style="--value: ${value}" data-tooltip="${percent}%"></div>`;
      })
      .join("");
  }

  render() {
    const element = document.createElement("div");
    const className = `column-chart ${
      this.isLoading() ? "" : "column-chart_loading"
    }`;

    element.innerHTML = `
    <div 
      class="${className}"
      style="--chart-height: ${this.chartHeight}"
    >
      ${this.renderTitle()}
      <div class="column-chart__container">
        ${this.renderHeader()}
        <div data-element="body" class="column-chart__chart">
          ${this.renderData()}
        </div>
      </div>
    </div>
    `;

    this.element = element.firstElementChild;
  }

  update(data) {
    this.data = data;
    this.render();
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
