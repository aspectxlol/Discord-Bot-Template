import { CommandInteraction, CacheType, SlashCommandBuilder } from "discord.js";
import testModal from "../modals/testModal";
import bot from "../../structures/bot";
import BotCommand from "../../structures/BotCommand";

class modal extends BotCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('modal').setDescription('shows a test modal').toJSON())
    }
    public async execute(interaction: CommandInteraction<CacheType>, client: bot) {
        interaction.showModal(testModal.data)
    }
}

export default new modal()