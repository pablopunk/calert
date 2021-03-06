# calert

<p align="center">
  <a href="https://standardjs.com/"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" /> </a>
  <a href="https://github.com/pablopunk/miny"><img src="https://img.shields.io/badge/made_with-miny-1eced8.svg" /> </a>
  <a href="https://www.npmjs.com/package/calert"><img src="https://img.shields.io/npm/dt/calert.svg" /></a>
</p>

<p align="center">
  <i>Get calendar notifications on desktop</i>
</p>


## To do

- [x] Local data storage - Maybe not necessary. Use node-persist if it is.
- [x] Retrieve calendar events
- [x] Schedule notifications for current events
- [x] Make CLI
- [x] Create a daemon (https://www.npmjs.com/package/os-service)
- [ ] Make it work with sudo
- [ ] Subscribe to changes in calendar to sync locally (use api watches)
- [ ] Target [macOS service](https://github.com/coreybutler/node-mac) too
- [ ] Use [pkg](https://github.com/zeit/pkg)

Other ideas for the future

- Support multiple accounts
- Create events/reminders


## Install

```sh
npm install -g calert
```


## Usage

```bash
$ calert
```


## Development

* Clone the repo
* Sign up for [Google Calendar API](https://developers.google.com/calendar/)
* Create a new app
* Enable billing (allows continued use)
* Download the JSON with the credentials and place it in your repo in a `credentials.json`
* That's it


## License

MIT


## Author

| ![me](https://gravatar.com/avatar/fa50aeff0ddd6e63273a068b04353d9d?size=100)           |
| --------------------------------- |
| [Pablo Varela](https://pablo.life)   |

