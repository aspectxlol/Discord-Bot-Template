import { ClientEvents } from "discord.js";
import AspectxBot from "./bot";

export default abstract class BotEvent<T extends EventName> {
    client: AspectxBot 

    constructor( client: AspectxBot) {
        this.client = client
    }

    public abstract execute(...args: ClientEvents[T]): void
}

export type EventName = keyof ClientEvents;

export type EventListener<T extends EventName> = (
    client: AspectxBot,
    ...args: ClientEvents[T]
) => void;

export interface IBotEvent<T extends EventName> {
    eventName: T;
    once?: boolean;
    run: EventListener<T>;
}