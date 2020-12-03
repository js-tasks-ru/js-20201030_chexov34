import RangePicker from '../../08-forms-fetch-api-part-2/2-range-picker/index.js';
import SortableTable from '../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js';
import ColumnChart from '../../07-async-code-fetch-api-part-1/1-column-chart/index.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

function createElementFromString(string) {
  const div = document.createElement("div");
  div.innerHTML = string.trim();
  return div.firstElementChild;
}

export default class Page {
  /** @type HTMLElement */
  element;
  subElements = {};
  components = {
    rangePicker: null,
    ordersChart: null,
    salesChart: null,
    customersChart: null
  };
  onUpdateComponents = event => {
    const {
      from,
      to
    } = event.detail;

    this.updateComponents(from, to);
  }

  async render() {
    this.element = createElementFromString(this.template);
    this.subElements = this.getSubElements(this.element);

    const from = new Date(2019, 12, 1);
    const to = new Date(2020, 5, 5);

    this.components.rangePicker = new RangePicker({
      from,
      to
    });

    this.components.ordersChart = new ColumnChart({
      url: 'api/dashboard/orders',
      label: 'Заказы',
      range: {
        from,
        to
      },
      link: '#'
    });

    this.components.salesChart = new ColumnChart({
      url: 'api/dashboard/sales',
      label: 'Продажи',
      formatHeading: data => `$${data}`,
      range: {
        from,
        to
      }
    });

    this.components.customersChart = new ColumnChart({
      url: 'api/dashboard/customers',
      label: 'Клиенты',
      range: {
        from,
        to
      }
    });

    this.components.sortableTable = new SortableTable(header, {
      url: `api/dashboard/bestsellers?_start=1&_end=20&from=${from.toISOString()}&to=${to.toISOString()}`,
      isSortLocal: true
    });

    this.renderComponents();
    this.initEventListeners();

    return this.element;
  }

  renderComponents() {
    Object.entries(this.components).forEach(([name, component]) => {
      this.subElements[name].append(component.element);
    });
  }

  get template() {
    return `
    <div class="dashboard">
        <div class="content__top-panel">
          <h2 class="page-title">Панель управления</h2>
          <!-- RangePicker -->
          <div data-element="rangePicker"></div>
        </div>
        <!-- ColumnCharts -->
        <div data-element="chartsRoot" class="dashboard__charts">
          <div data-element="ordersChart" class="dashboard__chart_orders"></div>
          <div data-element="salesChart" class="dashboard__chart_sales"></div>
          <div data-element="customersChart" class="dashboard__chart_customers"></div>
        </div>
        <h3 class="block-title">Лидеры продаж</h3>
        <!-- SortableTable -->
        <div data-element="sortableTable"></div>
      </div>
    `;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll("[data-element]");

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  initEventListeners() {
    this.components.rangePicker.element.addEventListener('date-select', this.onUpdateComponents);
  }


  async updateComponents(from, to) {
    this.components.ordersChart.update(from, to);
    this.components.salesChart.update(from, to);
    this.components.customersChart.update(from, to);
    await this.updateSortableTable(from, to);
  }

  async updateSortableTable(from, to) {
    const url = new URL('/api/dashboard/bestsellers', BACKEND_URL);
    url.searchParams.append('from', from);
    url.searchParams.append('to', to);
    this.components.sortableTable.setData(await fetchJson(url));
  }

  remove() {
    Object.values(this.components).forEach(component => {
      component.remove();
    });
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    Object.values(this.components).forEach(component => {
      component.destroy();
    });
    this.removeEventListener();
    this.remove();
  }

  removeEventListener() {
    this.components.rangePicker.element.removeEventListener('date-select', this.onUpdateComponents);
  }
}
