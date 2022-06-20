import { Modal, ModalSubmitInteraction } from "discord.js"
import AspectxBot from "./bot"

export default abstract class BotModal {
    data: Modal
    name: string
    constructor(name: string, data: Modal) {
        this.data = data
        this.name = name
    }

    public abstract execute(interaction: ModalSubmitInteraction, client: AspectxBot): any
}
