import AspectxBot from "./Bot";
import { 
    ButtonInteraction, 
    ButtonBuilder 
} from "discord.js";

export default abstract class BotButtons {
    data: ButtonBuilder
    name: string

    constructor(name: string, data: ButtonBuilder) {
        this.data = data
        this.name = name
    }

    public abstract execute(interaction: ButtonInteraction, client: AspectxBot): any
}