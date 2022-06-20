import { Message } from "discord.js";
import AspectxBot from "../structures/bot";
import BotEvent from "../structures/BotEvents";

export default class onMessageCreateEvent extends BotEvent<"messageCreate"> {
    constructor(client: AspectxBot) {
        super(client)
    }

    public execute(message: Message<boolean>): void {
        return;
    }
}