import botButtons from "./BotButtons";
import BotCommand from "./BotCommand";
import BotModal from "./BotModal";
import { 
    Client, 
    ClientOptions, 
    Collection 
} from "discord.js";

export default class Bot extends Client {
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