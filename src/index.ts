import { Intents } from 'discord.js'
import onReadyEvent from './events/onReady'
import AspectxBot from './structures/bot'
import { config } from 'dotenv'
import onCommandInteractionCreateEvent from './events/onInteractionCreate'
import onMessageCreateEvent from './events/messageCreateEvent'
import ModalSubmitInteraction from './events/onInteractionModalSubmitCreateEvent'
import ButtonInteractionSubmitEvent from './events/onButtonInteractionSubmitEvents'
config()

const client = new AspectxBot({
    intents: new Intents(32767)
}) 

client.on('ready', () => { new onReadyEvent(client).execute() } )
client.on('interactionCreate', (interaction) => { new onCommandInteractionCreateEvent(client).execute(interaction) })
client.on('interactionCreate', (interaction) => { new ModalSubmitInteraction(client).execute(interaction) })
client.on('interactionCreate', (interaction) => { new ButtonInteractionSubmitEvent(client).execute(interaction) })
client.on('messageCreate', (message) => { new onMessageCreateEvent(client).execute(message) })

client.login(process.env.TOKEN)