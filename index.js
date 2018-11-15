const authorize = require('./src/auth')
const calendar = require('./src/calendar')
const schedule = require('./src/schedule')

async function main () {
  const authClient = await authorize()
  calendar.connect(authClient)
  const events = await calendar.list()
  events.map(schedule.add)
}

main()
