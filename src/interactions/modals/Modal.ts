
import BotModal from "../../structures/BotModal";
import bot from "../../structures/Bot";
import { 
    ModalSubmitInteraction, 
    CacheType, 
    ModalBuilder, 
    ActionRowBuilder, 
    TextInputBuilder, 
    TextInputStyle 
} from "discord.js";

const textInput = new TextInputBuilder()
    .setCustomId('wthAreYouDoing')
    .setLabel('What the hell are you doing')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)

const row = new ActionRowBuilder<TextInputBuilder>()
    .addComponents(textInput)

class Modal extends BotModal {
    constructor() {
        super('test', new ModalBuilder().setCustomId('test').setTitle('E').addComponents(row))
    }

    public async execute(interaction: ModalSubmitInteraction<CacheType>, client: bot) {
        const wth = interaction.fields.getTextInputValue('wthAreYouDoing')
        return await interaction.reply(`${interaction.user.username} is doing ${wth}`)
    }
}

export default new Modal()