const { appendFile } = require('fs')

module.exports = (...args) => {
  if (process.stdout.isTTY) {
    console.log(...args)
  } else {
    appendFile(process.argv[1] + '.log', args, _ => _)
  }
}
