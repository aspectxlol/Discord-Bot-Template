import { ButtonInteraction, CacheType, ButtonBuilder, ButtonStyle } from "discord.js";
import bot from "../../structures/bot";
import botButtons from "../../structures/BotButtons";

class testButton extends botButtons {
    constructor() {
        super('test', new ButtonBuilder().setCustomId('test').setLabel('E').setStyle(ButtonStyle.Primary) )
    }
    public execute(interaction: ButtonInteraction<CacheType>, client: bot) {
        return interaction.reply('e')
    }
}

export default new testButton()