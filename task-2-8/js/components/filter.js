import companyTemplate from "../templates/companyTemplate.js";
import Component from "./Component.js";
import { ALL_COMPANY } from "../utils/constants.js";

export default class Filter extends Component {
  constructor() {
    super();
    this.params = {
      filter: {
        query: "",
        company: "",
        price: 0,
      },
      companies: [],
      minPrice: 0,
      maxPrice: 0,
      onChange: () => null,
    };
    this.refs = this.getRefs();
    this.bindEvents();
  }

  // ------ Component update ------
  update() {
    const { filter, companies, minPrice, maxPrice } = this.params;

    const allCompany = {
      name: ALL_COMPANY,
      qty: companies.reduce((sum, { qty }) => sum + qty, 0),
    };

    // render companies list
    this.refs.companies.innerHTML = [
      companyTemplate(allCompany),
      ...companies.map(companyTemplate),
    ].join("");

    // set form values
    const elements = this.refs.filter.elements;
    elements.company.value = filter.company || ALL_COMPANY;
    elements.query.value = filter.query;
    elements.price.min = minPrice;
    elements.price.max = maxPrice;
    elements.price.value = filter.price;
    this.updatePriceOutput();
  }

  // ------ Helpers ------
  updatePriceOutput = () => {
    const { price, priceOutput } = this.refs.filter.elements;
    priceOutput.value = `$ ${Number(price.value).toFixed(2)}`;
  };

  // ------ Event handlers ------
  handleChange = () => {
    const { query, company, price } = this.refs.filter.elements;

    // fire onChange event
    this.params.onChange({
      query: query.value,
      company: company.value === ALL_COMPANY ? "" : company.value,
      price: Number(price.value),
    });
  };

  bindEvents() {
    const { filter } = this.refs;
    filter.addEventListener("submit", (e) => e.preventDefault());
    filter.addEventListener("change", this.handleChange);
    filter.addEventListener("input", this.updatePriceOutput);
  }

  getRefs() {
    const filter = document.querySelector(".js-filter");
    return {
      filter,
      companies: filter.querySelector(".js-companies"),
    };
  }
}
