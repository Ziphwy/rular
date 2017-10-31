const options = {};

export function register(...genOptions) {
  genOptions.forEach((opt) => {
    const { type, createOption, createOptionConfig } = opt;
    options[type] = { createOption, createOptionConfig };
  });
}

export function getOptionTypes() {
  return Object.keys(options);
}

export function initOption() {
  const opt = {};
  Object.keys(options).forEach((type) => {
    opt[type] = options[type].createOption();
  });
  return opt;
}

export function initOptionConfig(type, opt) {
  return options[type].createOptionConfig(opt[type]);
}
