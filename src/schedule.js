const schedule = require('node-schedule')
const notify = require('./notify')

const { getCronInfoFromEvent, getEventForNotification } = require('./event')

const fire = e =>
  notify(getEventForNotification(e))

module.exports.add = e =>
  schedule.scheduleJob(getCronInfoFromEvent(e), _ => fire(e))
