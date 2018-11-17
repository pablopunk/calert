const mri = require('mri')
const isSudo = require('is-elevated')
const sudo = require('sudo-prompt')
const commandJoin = require('command-join')
const service = require('./src/service')
const log = require('./src/log')

const usage = _ => console.log(`
Unkown command '${_}'

Usage:

- Add service:

  calert

- Run from command line:

  calert run

`)

const rerunAsSudo = _ => {
  sudo.exec(commandJoin(process.argv), { name: 'calert' }, (err, stdout, stderr) => {
    (err || stderr)
      ? log(err || stderr)
      : log(stdout)
  })
}

async function main (action) {
  switch (action) {
    case 'run':
      service.run()
      break
    case '':
      await isSudo()
        ? service.add()
        : rerunAsSudo()
      break
    default:
      usage(action)
      break
  }
}

const args = mri(process.argv.slice(2))

main(args._[0] || '')
  .catch(log)
