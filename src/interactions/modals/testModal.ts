import { ModalSubmitInteraction, CacheType, Modal, TextInputComponent, MessageActionRow, ModalActionRowComponent } from "discord.js";
import bot from "../../structures/bot";
import BotModal from "../../structures/BotModals";

const textInput = new TextInputComponent()
    .setCustomId('wthAreYouDoing')
    .setLabel('What the hell are you doing')
    .setStyle('PARAGRAPH')
    .setRequired(true)

const row = new MessageActionRow<ModalActionRowComponent>()
    .addComponents(textInput)

class testModal extends BotModal {
    constructor() {
        super('test', new Modal().setCustomId('test').setTitle('E').addComponents(row))
    }

    public async execute(interaction: ModalSubmitInteraction<CacheType>, client: bot) {
        const wth = interaction.fields.getTextInputValue('wthAreYouDoing')
        return await interaction.reply(`${interaction.user.username} is doing ${wth}`)
    }
}

export default new testModal()