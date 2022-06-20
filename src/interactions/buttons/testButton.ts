import { ButtonInteraction, CacheType, MessageButton } from "discord.js";
import bot from "../../structures/bot";
import botButtons from "../../structures/BotButtons";

class testButton extends botButtons {
    constructor() {
        super('test', new MessageButton().setCustomId('test').setLabel('E').setStyle('PRIMARY') )
    }
    public execute(interaction: ButtonInteraction<CacheType>, client: bot) {
        return interaction.reply('e')
    }
}

export default new testButton()