const pify = require('pify')
const { google } = require('googleapis')

module.exports.list = async client => {
  const calendar = google.calendar({ version: 'v3', client })

  google.calendar = pify(calendar.events.list)

  const results = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  })

  const events = results.data.items

  console.log('Events')

  if (events.length < 1) {
    console.log('No events')
  }

  events.map(event => {
    const start = event.start.dateTime || event.start.date
    console.log(`${start} - ${event.summary}`)
  })
}
