import Component from "./Component.js";
import Catalog from "./Catalog.js";
import Filter from "./Filter.js";
import { count, sort } from "../utils/helpers.js";

export default class FilteredCatalog extends Component {
  constructor() {
    super();
    this.params = {
      products: [],
      filter: {
        query: "",
        company: "",
        price: 0,
      },
    };
    this.refs = this.getRefs();
    this.bindEvents();
  }

  // ------ Component update ------
  update() {
    const {
      products,
      filter: { query, company, price },
    } = this.params;
    const { catalog, filter } = this.refs;

    const filteredProducts = this.getFilteredProducts(products, query, price);

    // show filtered products in catalog
    catalog.setParams({
      products: filteredProducts.filter(({ brand }) =>
        company ? brand === company : true
      ),
    });

    // update numbers in filter
    filter.setParams({
      filter: { ...this.params.filter },
      companies: this.getCompanies(products, filteredProducts),
    });
  }

  didUpdate(prevParams) {
    const { products, filter } = this.params;

    // update min/max price in filter if new products arrived
    if (products !== prevParams.products) {
      const [minPrice, maxPrice] = this.getPriceRange(products);
      this.refs.filter.setParams({
        filter: { ...filter, price: maxPrice },
        minPrice,
        maxPrice,
      });
    }
  }

  // ------ Helpers ------
  getFilteredProducts(products, query, maxPrice) {
    const searchQuery = query.trim().toLowerCase();
    return products.filter(
      ({ model, brand, info, price }) =>
        (searchQuery
          ? model.toLowerCase().includes(searchQuery) ||
            brand.toLowerCase().includes(searchQuery) ||
            info.toLowerCase().includes(searchQuery)
          : true) && (maxPrice ? price <= maxPrice : true)
    );
  }

  getPriceRange(products) {
    const maxPrice = products.reduce(
      (max, { price }) => (price > max ? price : max),
      0
    );
    const minPrice = products.reduce(
      (min, { price }) => (price < min ? price : min),
      maxPrice
    );
    return [minPrice, maxPrice];
  }

  getCompanies(products, filteredProducts) {
    const brandNames = [...new Set(products.map(({ brand }) => brand))];
    const brandCounts = count(filteredProducts, "brand");
    const companies = brandNames.map((name) => ({
      name,
      qty: brandCounts[name] ?? 0,
    }));
    return sort(companies, "name");
  }

  // ------ Event handlers ------
  bindEvents() {
    this.refs.filter.setParams({
      onChange: (filter) => this.setParams({ filter }),
    });
  }

  getRefs() {
    return {
      catalog: new Catalog(),
      filter: new Filter(),
    };
  }
}
