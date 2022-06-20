import { CacheType, Interaction, MessageEmbed } from "discord.js";
import AspectxBot from "../structures/bot";
import BotCommand from "../structures/BotCommand";
import BotEvent from "../structures/BotEvents";

export default class onCommandInteractionCreateEvent extends BotEvent<'interactionCreate'> {
    constructor(client: AspectxBot) {
        super(client)

    }

    public execute(interaction: Interaction<CacheType>): void {
        if(!interaction.isCommand()) return
        const command = this.client.commands.get(interaction.commandName.toString())

        if(!command) return

        try {
            command?.execute(interaction, this.client);
        } catch (e) {
            if(e instanceof Error) {
                const embed = new MessageEmbed()
                    .setTitle(`${e.name}`)
                    .setDescription(e.message)

                interaction.reply({embeds: [embed], ephemeral: true})
            }
        }
    }
    
}

