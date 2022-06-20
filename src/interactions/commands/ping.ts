import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageActionRow, MessageEmbed } from "discord.js";
import testButton from "../buttons/testButton";
import bot from "../../structures/bot";
import BotCommand from "../../structures/BotCommand";

class Ping extends BotCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('ping').setDescription('adwadasdafawfag').toJSON())
    }

    public async execute(interaction: CommandInteraction, client: bot) {
        const pingEmbed = new MessageEmbed()
            .setTitle('PONG 🏓')
            .setDescription('the latency between the bot and discord')
            .addFields([
                {name: 'Websocket Ping', value: `${client.ws.ping}ms`, inline: true},
                {name: 'Bot Ping', value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true}
            ])

        const row = new MessageActionRow()
            .addComponents(testButton.data)
        await interaction.reply({embeds: [pingEmbed], components: [row]})
    }
}

export default new Ping()