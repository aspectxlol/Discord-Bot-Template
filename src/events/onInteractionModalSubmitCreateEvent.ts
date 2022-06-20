import { Interaction, CacheType, MessageEmbed } from "discord.js";
import AspectxBot from "../structures/bot";
import BotEvent from "../structures/BotEvents";

export default class ModalSubmitInteraction extends BotEvent<"interactionCreate"> {
    constructor(client: AspectxBot) {
        super(client)
    }

    public async execute(interaction: Interaction<CacheType>) {
        if(!interaction.isModalSubmit()) return 
        const modal = this.client.modal.get(interaction.customId)
        if(!modal) return

        try {
            await modal.execute(interaction, this.client)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error)
                const embed = new MessageEmbed()
                    .setTitle(`${error.name}`)
                    .setDescription(error.message)

                await interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
}