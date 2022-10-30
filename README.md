# luna
Luna is a simple way to create discord bots!
```js
const Luna = require('luna');

const bot = new Luna.Client({
  token: 'Your token here',
  intents: 'Intents here'
})

bot.login()

bot.on('connect', () => {
  console.log(`Logged in ${bot.user.username}!`)
})

bot.on('message', (message) => {
  if(message.content === '!ping'){
    return bot.funcs.sendMessage('Pong!', message.channelId)
  }
})
```
