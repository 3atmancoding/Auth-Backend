const Validator = require("validator");
const isEmpty = require("is-empty");
const Strings = require("../utils/strings");
module.exports = function validateLoginInput(data) {
  let errors = {}; // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : ""; // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = `${Strings.emailRequired}`;
  } else if (!Validator.isEmail(data.email)) {
    errors.email = `${Strings.emailInvalid}`;
  } // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = `${Strings.passwordRequired}`;
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
