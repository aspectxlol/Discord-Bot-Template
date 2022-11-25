import BotCommand from '../structures/BotCommand';
import bot from '../structures/Bot';
import {
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from 'discord.js';

class Ping extends BotCommand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('ping')
				.setDescription('adwadasdafawfag')
				.toJSON()
		);
	}

	public async execute(interaction: CommandInteraction, client: bot) {
		const pingEmbed = new EmbedBuilder()
			.setTitle('PONG 🏓')
			.setDescription('the latency between the bot and discord')
			.addFields([
				{ name: 'Websocket Ping', value: `${client.ws.ping}ms`, inline: true },
				{
					name: 'Bot Ping',
					value: `${Date.now() - interaction.createdTimestamp}ms`,
					inline: true,
				},
			]);
		await interaction.reply({ embeds: [pingEmbed] });
	}
}

export default new Ping();