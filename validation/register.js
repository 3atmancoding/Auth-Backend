const Validator = require("validator");
const isEmpty = require("is-empty");
const Strings = require("../utils/strings");
module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = `${Strings.nameRequired}`;
  } // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = `${Strings.emailRequired}`;
  } else if (!Validator.isEmail(data.email)) {
    errors.email = `${Strings.emailInvalid}`;
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = `${Strings.passwordRequired}`;
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = `${Strings.passwordConfirm}`;
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = `${Strings.passwordLength}`;
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = `${Strings.passwordMatch}`;
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
