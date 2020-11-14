export default class SortableTable {
  /**@type Node */
  element;
  /**@type Node */
  headerNode;
  /**@type Node */
  bodyNode;

  constructor(header = [], { data = [] }) {
    this.header = header;
    this.data = data;
    this.render();
  }

  compareString(str1, str2) {
    return str1.localeCompare(str2, ['ru', 'en'], {caseFirst: "upper"})
  }

  compareNumber(a, b) {
    return a - b;
  }

  static createElementFromString(string) {
    const div = document.createElement("div");
    div.innerHTML = string.trim();
    return div.firstChild;
  }

  get headerData() {
    return this.header
      .map((item) => {
        const sortable = item.sortable
          ? `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>`
          : "";
        const className = [
          {'sortable-table__cell': Boolean(item.sortable)}
        ]
          .filter(c => Object.values(c).includes(true))
          .map(c => [...new Set(Object.keys(c))])
        return `
      <div
        class="${className.join(' ')}"
        data-id="${item.id}"
        data-sortable="${item.sortable}"
      >
        <span>${item.title}</span>
        ${sortable}
      </div>
      `;
      })
      .join("");
  }

  headerDescription() {
    return this.header.map(h => {
      return {
        id: h.id,
        template: h.template
      }
    })
  }

  get bodyData() {
    const header = this.headerDescription()
    return this.data.map(item => {
      const innerData = header
        .map(h => `${h.template ? h.template(item[h.id]) : '<div class="sortable-table__cell">' + item[h.id] + '</div>'}`)
        .join('');
      return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${innerData}
      </a>
      `
    }).join('')
  }

  get headerTemplate() {
    return `
    <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerData}
    </div>`;
  }

  get bodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">${this.bodyData}</div>`
  }

  get template() {
    return `
    <div data-element="productsContainer" class="products-list__container">
      <div class="sortable-table">

      </div>
    </div>
    `
  }

  render() {
    this.element = SortableTable.createElementFromString(this.template)
    const table = this.element.querySelector('.sortable-table')
    if (table) {
      this.headerNode = SortableTable.createElementFromString(this.headerTemplate);
      this.bodyNode = SortableTable.createElementFromString(this.bodyTemplate);
      table.append(this.headerNode);
      table.append(this.bodyNode);
    }
  }

  destroy() {
    this.remove();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
    this.bodyNode = null;
    this.element = null;
    this.headerNode = null;
  }

  sort(field, type = 'asc') {
    const header = this.header.find(h => h.id === field)
    if(header && header.sortable) {
      const type = header.sortType
      this.data = [...this.data].sort((obj1, obj2) => {
        const v1 = obj1[field]
        const v2 = obj2[field]
        switch (type) {
          case 'string':
            return this.compareString(v1, v2)
          case 'number':
            return this.compareNumber(v1, v1)
          default:
            return 0
        }
      })
    }

  }


}
