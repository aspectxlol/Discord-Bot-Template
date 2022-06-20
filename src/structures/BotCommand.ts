import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10'
import { CommandInteraction, Interaction } from 'discord.js'
import AspectxBot from './bot'

export default abstract class BotCommand {
    data: RESTPostAPIApplicationCommandsJSONBody
    
    constructor(data: RESTPostAPIApplicationCommandsJSONBody) {
        this.data = data
    }

    public abstract execute(interaction: CommandInteraction, client: AspectxBot): any

}