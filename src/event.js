const getDate = e => new Date(e.start.dateTime || e.start.date)

module.exports.getEventForNotification = e => ({
  title: getDate(e).toLocaleTimeString(),
  message: e.summary
})

module.exports.getCronInfoFromEvent = e => {
  const date = getDate(e)
  const cron = [
    date.getSeconds(),
    date.getMinutes(),
    date.getHours(),
    date.getDate(),
    date.getMonth() + 1,
    '*'
  ]

  return cron.join(' ')
}

module.exports.getEventId = e => e.etag
