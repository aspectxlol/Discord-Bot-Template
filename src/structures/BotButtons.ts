import { ButtonInteraction, ButtonBuilder } from "discord.js";
import AspectxBot from "./bot";

export default abstract class botButtons {
    data: ButtonBuilder
    name: string

    constructor(name: string, data: ButtonBuilder) {
        this.data = data
        this.name = name
    }

    public abstract execute(interaction: ButtonInteraction, client: AspectxBot): any
}