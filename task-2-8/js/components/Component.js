export default class Component {
  constructor() {
    this.params = {};
    setTimeout(() => this.didInit?.());
  }

  setParams(change) {
    setTimeout(() => {
      // run update only if params change
      if (Object.keys(change).some((key) => this.params[key] !== change[key])) {
        const prevParams = { ...this.params };
        this.params = { ...this.params, ...change };
        this.update?.();
        this.didUpdate?.(prevParams);
      }
    });
  }
}
