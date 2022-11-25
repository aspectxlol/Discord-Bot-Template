import BotCommand from './BotCommand';
import { Client, ClientOptions, Collection } from 'discord.js';

export default class Bot extends Client {
	commands: Collection<string, BotCommand>;

	constructor(options: ClientOptions) {
		super(options);
		this.commands = new Collection();
	}
}
