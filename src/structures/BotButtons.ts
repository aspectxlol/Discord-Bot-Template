import { ButtonInteraction, MessageButton } from "discord.js";
import AspectxBot from "./bot";

export default abstract class botButtons {
    data: MessageButton
    name: string

    constructor(name: string, data: MessageButton) {
        this.data = data
        this.name = name
    }

    public abstract execute(interaction: ButtonInteraction, client: AspectxBot): any
}