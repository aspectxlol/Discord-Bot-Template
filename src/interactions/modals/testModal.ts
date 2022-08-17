import { ModalSubmitInteraction, CacheType, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import bot from "../../structures/bot";
import BotModal from "../../structures/BotModals";

const textInput = new TextInputBuilder()
    .setCustomId('wthAreYouDoing')
    .setLabel('What the hell are you doing')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)

const row = new ActionRowBuilder<TextInputBuilder>()
    .addComponents(textInput)

class testModal extends BotModal {
    constructor() {
        super('test', new ModalBuilder().setCustomId('test').setTitle('E').addComponents(row))
    }

    public async execute(interaction: ModalSubmitInteraction<CacheType>, client: bot) {
        const wth = interaction.fields.getTextInputValue('wthAreYouDoing')
        return await interaction.reply(`${interaction.user.username} is doing ${wth}`)
    }
}

export default new testModal()