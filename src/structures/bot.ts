import { Client, ClientOptions, Collection } from "discord.js";
import botButtons from "./BotButtons";
import BotCommand from "./BotCommand";
import BotModal from "./BotModals";

export default class AspectxBot extends Client {
    commands: Collection<string, BotCommand>
    modal: Collection<string, BotModal>
    button: Collection<string, botButtons>

    constructor(options: ClientOptions) {
        super(options)
        this.commands = new Collection()
        this.modal = new Collection()
        this.button = new Collection()
    }
}