import BotCommand from "../../structures/BotCommand";
import testButton from "../buttons/Button";
import bot from "../../structures/Bot";
import { 
    CommandInteraction, 
    ActionRowBuilder, 
    EmbedBuilder, 
    ButtonBuilder,
    SlashCommandBuilder
} from "discord.js";

class Ping extends BotCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('ping').setDescription('adwadasdafawfag').toJSON())
    }

    public async execute(interaction: CommandInteraction, client: bot) {
        const pingEmbed = new EmbedBuilder()
            .setTitle('PONG 🏓')
            .setDescription('the latency between the bot and discord')
            .addFields([
                {name: 'Websocket Ping', value: `${client.ws.ping}ms`, inline: true},
                {name: 'Bot Ping', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true}
            ])

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(testButton.data)
        await interaction.reply({embeds: [pingEmbed], components: [row]})
    }
}

export default new Ping()