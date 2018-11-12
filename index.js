const pify = require('pify')
const fs = pify(require('fs'))
const readline = require('readline-promise').default
const { google } = require('googleapis')
const credentials = require('./credentials.json')

authorize(credentials)
  .then(callAppsScript)

async function authorize (credentials, callback) {
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

function callAppsScript (authClient) {
  // do whatever with the api
  console.log('ready')
}

async function getAccessToken (authClient) {
  const url = authClient.generateAuthUrl({
    'access_type': 'offline',
    scope: 'https://www.googleapis.com/auth/calendar'
  })
  console.log(`Visit this url to authorize\n${url}`)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return rl.questionAsync('Enter auth code: ')
    .then(code => {
      rl.close()
      return authClient.getToken(code)
        .then(token =>
          fs.writeFile('token.json', JSON.stringify(token))
            .then(_ => authClient)
        )
    })
}
