import { ModalBuilder, ModalSubmitInteraction } from "discord.js"
import AspectxBot from "./bot"

export default abstract class BotModal {
    data: ModalBuilder
    name: string
    constructor(name: string, data: ModalBuilder) {
        this.data = data
        this.name = name
    }

    public abstract execute(interaction: ModalSubmitInteraction, client: AspectxBot): any
}
