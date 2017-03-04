
module.exports = function (prototype, func) {

  // Don't override existing definitions
  if ( prototype[func.name] ) return;

  Object.defineProperty(prototype, func.name, {
    value: func,
    writable: true,
    configurable: true,
    enumerable: false
  });
}
