import AspectxBot from './Bot'
import { 
    CommandInteraction 
} from 'discord.js'
import { 
    RESTPostAPIApplicationCommandsJSONBody 
} from 'discord-api-types/v10'

export default abstract class BotCommand {
    data: RESTPostAPIApplicationCommandsJSONBody
    
    constructor(data: RESTPostAPIApplicationCommandsJSONBody) {
        this.data = data
    }

    public abstract execute(interaction: CommandInteraction, client: AspectxBot): any

}