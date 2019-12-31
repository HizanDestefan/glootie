import * as firebase from 'firebase/app'
import 'firebase/firestore'
import Discord from 'discord.js'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_NAME}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_NAME}.firebaseio.com`,
  projectId: process.env.FIREBASE_PROJECT_NAME,
  storageBucket: `${process.env.FIREBASE_PROJECT_NAME}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const client = new Discord.Client()

// TODO: Put your prefix on Firestore and make it so that servers are able to define their own prefix
const prefix = `$`

client.once(`ready`, () => {
  console.log(`Ready!`)
})

client.on(`message`, (message:any) => {
  db.collection(`messages`).doc(message.id).set({
    message: message.content
  })

  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(` `)
  const command = args.shift().toLowerCase()
  const taggedUser = message.mentions.users.first()

  if (command === `ping`) {
    message.channel.send('Pong.')
  } else if (command === `beep`) {
    message.channel.send(`Boop.`)
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
