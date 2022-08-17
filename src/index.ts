import { GatewayIntentBits, Partials } from 'discord.js'
import AspectxBot from './structures/bot'
import { config } from 'dotenv'
import { ButtonInteraction, CommandInteraction, ModalInteraction, MessageCreate, Ready } from './events'
config()

const client = new AspectxBot({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User
    ]
}) 

client.on('ready', () => { new Ready(client).execute() } )
client.on('interactionCreate', (interaction) => { new ButtonInteraction(client).execute(interaction) })
client.on('interactionCreate', (interaction) => { new ModalInteraction(client).execute(interaction) })
client.on('interactionCreate', (interaction) => { new CommandInteraction(client).execute(interaction) })
client.on('messageCreate', (message) => { new MessageCreate(client).execute(message) })

client.login(process.env.TOKEN)