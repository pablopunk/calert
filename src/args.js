const mri = require('mri')

module.exports.parse = argv => {
  argv = argv.slice(2)
  const args = mri(argv)
  const argsAsObject = {}

  for (const a of args._) {
    argsAsObject[a] = true
  }

  return argsAsObject
}
