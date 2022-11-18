const REGEXP = {
  // Email regex that will match 99% of valid email addresses,
  // but will not pass validation for email addresses that have, for instance:
  // - Dots in the beginning
  // - Multiple dots at the end
  email:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,

  // Simple date regex (DD/MM/YYYY)
  date: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,

  // Strong password regex
  // - Has minimum 6 characters in length, you can adjust it by modifying {6,}
  // - At least one uppercase English letter, you can disable this condition by removing (?=.*?[A-Z])
  // - At least one lowercase English letter, you can disable this condition by removing (?=.*?[a-z])
  // - At least one digit, you can disable this condition by removing (?=.*?[0-9])
  // - At least one special character, you can disable this condition by removing (?=.*?[#?!@$%^&*-])
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/,
};

// The Singleton Validator class
export default class Validator {
  static #instance;

  constructor() {
    if (Validator.#instance) {
      return Validator.#instance;
    }
    Validator.#instance = this;
  }

  isEmail(string) {
    return REGEXP.email.test(string);
  }

  isDate(string) {
    return REGEXP.date.test(string);
  }

  isPassword(string) {
    return REGEXP.password.test(string);
  }

  isRequired(string) {
    return Boolean(string.trim());
  }
}
