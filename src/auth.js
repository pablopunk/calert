const { google } = require('googleapis')
const pify = require('pify')
const fs = pify(require('fs'))
const readline = require('readline-promise').default
const opn = require('opn')

async function authorize () {
  const credentials = require('../credentials.json')
  // eslint-disable-next-line camelcase
  const { client_secret, client_id, redirect_uris } = credentials.installed
  const authClient = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

  authClient.getToken = pify(authClient.getToken)

  return fs.readFile('token.json')
    .then((token) => {
      authClient.setCredentials(JSON.parse(token))
      return authClient
    })
    .catch(_ => {
      return getAccessToken(authClient)
    })
}

async function getAccessToken (authClient) {
  const url = authClient.generateAuthUrl({
    'access_type': 'offline',
    scope: 'https://www.googleapis.com/auth/calendar'
  })
  opn(url)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return rl.questionAsync('Enter auth code from browser: ')
    .then(code => {
      rl.close()
      return authClient.getToken(code)
        .then(token =>
          fs.writeFile('token.json', JSON.stringify(token))
            .then(_ => authClient)
        )
    })
}

module.exports = authorize
