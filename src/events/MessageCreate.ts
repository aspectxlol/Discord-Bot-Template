import BotEvent from "../structures/BotEvent";
import AspectxBot from "../structures/Bot";
import { 
    Message
} from "discord.js";

export default class MessageCreate extends BotEvent<"messageCreate"> {
    constructor(client: AspectxBot) {
        super(client)
    }

    public execute(message: Message<boolean>): void {
        return;
    }
}