const service = require('os-service')
const notify = require('./notify')
const log = require('./log')

const SERVICE_NAME = 'calert'

module.exports.add = _ =>
  service.add(SERVICE_NAME, { programArgs: ['run'] }, err => {
    if (err) {
      throw err
    }
    log(`${SERVICE_NAME} service added`)
  })

module.exports.run = _ => {
  service.run(_ => service.stop(0))

  notify({ title: 'test', message: '42' })
}
