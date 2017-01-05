
exports.install = function () {
  var package = require('./package.json')

  if ( ! package.exjs ) {
    console.warning("[exjs] WARNING: No `exjs` key in package.json")
    return
  }
  if ( ! Array.isArray(package.exjs) ) {
    console.error("[exjs] Error: The value of `exjs` in package.json must be an array of strings.")
    return
  }

  package.exjs.forEach(function (ex) {
    require('./' + ex)
  })
}
