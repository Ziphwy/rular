function throttle(func, maxWait, wait = 100) {
  let timer = null;
  let last = Date.now();
  return function _throttle(...args) {
    clearTimeout(timer);
    if (Date.now() - last > maxWait) {
      last = Date.now();
      func && func.apply(this, args);
    } else {
      timer = setTimeout(() => {
        last = Date.now();
        func && func.apply(this, args);
      }, wait);
    }
  };
}

export {
  throttle,
};
