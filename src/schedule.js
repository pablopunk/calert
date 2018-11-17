const schedule = require('node-schedule')
const notify = require('./notify')
const { getEventId, getCronInfoFromEvent, getEventForNotification } = require('./event')

const alreadyScheduled = {}

const isAlreadyScheduled = e => {
  const id = getEventId(e)
  return alreadyScheduled.hasOwnProperty(id) && alreadyScheduled[id] === true
}

const markAsScheduled = e => {
  alreadyScheduled[getEventId(e)] = true
}

const fire = e =>
  notify(getEventForNotification(e))

module.exports.add = e => {
  if (!isAlreadyScheduled(e)) {
    schedule.scheduleJob(getCronInfoFromEvent(e), _ => fire(e))
    markAsScheduled(e)
  }
}
