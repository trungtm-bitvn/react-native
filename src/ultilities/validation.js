const validation = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch (rule) {
      case "isEmail":
        isValid = emailValidator(val) && isValid;
        break;
      case "minLength":
        isValid = minLengthValidator(val, rules[rule]) && isValid;
        break;
      case "equalTo":
        isValid = equalToValidator(val, connectedValue[rule]) && isValid;
        break;
      default:
        break;
    }
  }
  return isValid;
};

const emailValidator = val => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    val
  );
};

const minLengthValidator = (val, length) => {
    return val.length >= length;
}

const equalToValidator = (val, checkVal) => {
    return val === checkVal;
}

export default validation;
