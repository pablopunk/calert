const authorize = require('./src/auth')
const calendar = require('./src/calendar')
const schedule = require('./src/schedule')
const args = require('./src/args')

const flags = args.parse(process.argv)

async function main (flags) {
  if (flags.login) {
    authorize(true)
    return
  }

  const authClient = await authorize()
  if (authClient) {
    calendar.connect(authClient)
    const events = await calendar.list()
    events.map(schedule.add)
  }
}

main(flags)
