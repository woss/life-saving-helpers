import { Channel, Client, Intents, MessageEmbed, TextChannel } from 'discord.js'

const appId = '123123'
const pubKey =
  '123123'
const botToken = '123123'

const botLink =
  'https://discord.com/api/oauth2/authorize?client_id=123123&permissions=8&scope=bot'

export function sendMessage(client: Client, message: MessageEmbed) {
  const channel = client.channels.cache.get('12313') as Channel

  if (channel.type === 'GUILD_TEXT') {
    ; (channel as TextChannel).send({ embeds: [message] }) qq
  }
}

export default function createClient() {
  const client = new Client({
    intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILDS],
  })

  client.on('message', function (message) {
    console.log('discord msg')
  })

  client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`)
  })

  client.login(botToken)

  return client
}
