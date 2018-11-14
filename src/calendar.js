const pify = require('pify')
const { google } = require('googleapis')

let auth
module.exports.connect = _auth => {
  auth = _auth
}

module.exports.list = async () => {
  const calendar = google.calendar({ version: 'v3', auth })

  calendar.events.list = pify(calendar.events.list)

  const results = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  })

  return results.data.items
}
