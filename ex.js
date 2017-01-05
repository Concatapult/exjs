
module.exports = function (prototype, func) {
  Object.defineProperty(prototype, func.name, {
    value: func,
    writable: true,
    configurable: true,
    enumerable: false
  });
}
