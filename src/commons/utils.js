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

function limit(n, min = n, max = n) {
  return Math.max(min, Math.min(n, max));
}


function divideProp(prop, computed) {
  const computedFunc = {};
  computed.forEach((cname) => {
    computedFunc[cname] = function _computed() {
      return this[prop][cname];
    };
  });
  return computedFunc;
}

export {
  throttle,
  limit,
  divideProp,
};
