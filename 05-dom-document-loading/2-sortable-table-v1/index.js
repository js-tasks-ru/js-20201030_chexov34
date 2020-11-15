export default class SortableTable {
  /**@type Node */
  element;
  subElements = {
    table: null,
    body: null,
    header: null,
    loading: null,
    emptyPlaceholder: null,
  };

  constructor(header = [], { data = [] }) {
    this.header = header;
    this.data = data;
    this.render();
  }

  sortStrings(arr, key, param = "asc") {
    return [...arr].sort((a, b) => {
      switch (param) {
        case "desc":
          return this.compare(b[key], a[key]);
        case "asc":
        default:
          return this.compare(a[key], b[key]);
      }
    });
  }

  sortNumbers(arr, key, param = "asc") {
    return [...arr].sort((a, b) => {
      switch (param) {
        case "desc":
          return b[key] - a[key];
        case "asc":
        default:
          return a[key] - b[key];
      }
    });
  }

  compare(str1, str2) {
    return str1.localeCompare(str2, ["ru", "en"], { caseFirst: "upper" });
  }

  get loadingTemplate() {
    return `
    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
    `;
  }

  static createElementFromString(string) {
    const div = document.createElement("div");
    div.innerHTML = string.trim();
    return div.firstChild;
  }

  getClassString(arr) {
    // пытался что-то придумать, как в vue [{'class': <boolean>, 'class',...] :)
    return arr
      .filter((c) => typeof c === "string" || Object.values(c).includes(true))
      .map((c) => [...new Set(Object.keys(c))])
      .join(" ");
  }

  get headerData() {
    return this.header
      .map((item) => {
        const sortable = item.sortable
          ? `<span data-element="arrow" class="sortable-table__sort-arrow">
              <span class="sort-arrow"></span>
            </span>`
          : "";
        return `
      <div
        class="${this.getClassString(["sortable-table__cell"])}"
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

  get emptyPlaceholderTemplate() {
    return `
    <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
    <div>
      <p>No products satisfies your filter criteria</p>
      <button type="button" class="button-primary-outline">Reset all filters</button>
    </div>
  </div>
    `;
  }

  headerDescription() {
    return this.header.map((h) => {
      return {
        id: h.id,
        template: h.template,
      };
    });
  }

  getRow(headerDescription, rowData) {
    return headerDescription.map((header) => {
      if (header.template) {
        return header.template(rowData[header.id]);
      }
      return `<div class="sortable-table__cell">${rowData[header.id]}</div>`;
    });
  }

  get bodyData() {
    const headerDescription = this.headerDescription();
    return this.data
      .map(
        (item) => `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.getRow(headerDescription, item).join("")}
      </a>
      `
      )
      .join("");
  }

  get headerTemplate() {
    return `
    <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerData}
    </div>`;
  }

  get bodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">${this.bodyData}</div>`;
  }

  get template() {
    return `
    <div data-element="productsContainer" class="products-list__container">

    </div>
    `;
  }

  get tableTemplate() {
    return `
    <div class="sortable-table">

    </div>
    `;
  }

  render() {
    this.element = SortableTable.createElementFromString(this.template);
    this.subElements.table = SortableTable.createElementFromString(
      this.tableTemplate
    );
    this.subElements.header = SortableTable.createElementFromString(
      this.headerTemplate
    );
    this.subElements.body = SortableTable.createElementFromString(
      this.bodyTemplate
    );
    this.subElements.loading = SortableTable.createElementFromString(
      this.loadingTemplate
    );
    this.subElements.emptyPlaceholder = SortableTable.createElementFromString(
      this.emptyPlaceholderTemplate
    );
    this.element.append(this.subElements.table);
    this.subElements.table.append(this.subElements.header);
    this.subElements.table.append(this.subElements.body);
  }

  destroy() {
    this.remove();
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
    this.element = null;
    this.subElements = {
      table: null,
      body: null,
      header: null,
      loading: null,
      emptyPlaceholder: null,
    };
  }

  getSortFunction(type) {
    switch (type) {
      case "string":
        return this.sortStrings;
      case "number":
        return this.sortNumbers;
    }
  }

  clearBody() {
    this.subElements.body.remove();
    this.subElements.body = null;
  }

  sort(field, type = "asc") {
    const header = this.header.find((h) => h.id === field);
    if (header && header.sortable) {
      const { sortType } = header;
      const f = this.getSortFunction(sortType);
      this.data = f.call(this, this.data, field, type);
      this.clearBody();
      this.subElements.body = SortableTable.createElementFromString(
        this.bodyTemplate
      );

      this.element.append(this.subElements.body);
    }
  }
}
