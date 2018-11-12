const authorize = require('./src/auth')
const calendar = require('./src/calendar')

authorize()
  .then(calendar.list)
