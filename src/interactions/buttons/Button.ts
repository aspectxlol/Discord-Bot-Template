import botButtons from '../../structures/BotButtons';
import bot from '../../structures/Bot';
import {
	ButtonInteraction,
	CacheType,
	ButtonBuilder,
	ButtonStyle,
} from 'discord.js';

class TestButton extends botButtons {
	constructor() {
		super(
			'test',
			new ButtonBuilder()
				.setCustomId('test')
				.setLabel('E')
				.setStyle(ButtonStyle.Primary)
		);
	}
	public execute(interaction: ButtonInteraction<CacheType>, client: bot) {
		return interaction.reply('e');
	}
}

export default new TestButton();
