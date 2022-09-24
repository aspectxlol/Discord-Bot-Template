import BotCommand from "../../structures/BotCommand";
import testModal from "../modals/Modal";
import bot from "../../structures/Bot";
import { 
    CommandInteraction, 
    CacheType, 
    SlashCommandBuilder 
} from "discord.js";

class Modal extends BotCommand {
    constructor() {
        super(new SlashCommandBuilder().setName('modal').setDescription('shows a test modal').toJSON())
    }
    public async execute(interaction: CommandInteraction<CacheType>, client: bot) {
        interaction.showModal(testModal.data)
    }
}

export default new Modal()