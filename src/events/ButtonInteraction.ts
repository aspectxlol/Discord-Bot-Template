import BotEvent from "../structures/BotEvent";
import AspectxBot from "../structures/Bot";
import {
    Interaction,
    CacheType,
    EmbedBuilder
} from "discord.js";

export default class ButtonInteraction extends BotEvent<"interactionCreate"> {
    constructor(client: AspectxBot) {
        super(client)
    }

    public async execute(interaction: Interaction<CacheType>) {
        if(!interaction.isButton()) return 
        const button = this.client.button.get(interaction.customId)
        if(!button) return

        try {
            await button.execute(interaction, this.client)
        } catch (error) {
            if(error instanceof Error) {
                console.log(error)
                const embed = new EmbedBuilder()
                    .setTitle(`${error.name}`)
                    .setDescription(error.message)

                await interaction.reply({embeds: [embed], ephemeral: true})
            }
        }    
    }
}