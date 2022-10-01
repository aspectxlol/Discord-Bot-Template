import BotCommand from '../structures/BotCommand';
import botButtons from '../structures/BotButtons';
import BotModals from '../structures/BotModal';
import BotEvent from '../structures/BotEvent';
import AspectxBot from '../structures/Bot';
import { REST } from '@discordjs/rest';
import {
	APIButtonComponent,
	APIButtonComponentWithCustomId,
	ButtonStyle,
} from 'discord.js';
import { buttonFiles, commandFiles, modalFiles } from '../utils/files';
import { Routes } from 'discord-api-types/rest/v10';

const hasId = (
	button: Partial<APIButtonComponent>
): button is Partial<APIButtonComponentWithCustomId> =>
	button.style !== ButtonStyle.Link;

export default class Ready extends BotEvent<'ready'> {
	commands: BotCommand[];
	modals: BotModals[];
	buttons: botButtons[];

	constructor(client: AspectxBot) {
		super(client);
		this.commands = [];
		this.modals = [];
		this.buttons = [];
	}

	public async execute(): Promise<void> {
		console.clear();
		await console.log(`logged in to ${this.client.user?.username}`);

		const tasks: Promise<unknown>[] = [];
		const modalTask: Promise<unknown>[] = [];
		const buttonTask: Promise<unknown>[] = [];

		for (const file of buttonFiles) {
			const task = import(file);
			task.then((module) => {
				const button = module.default as botButtons;
				if (button === undefined || button.data === undefined) {
					console.error(
						`File at path ${file} seems to incorrectly` +
							' be exporting a button.'
					);
				} else {
					this.buttons.push(button);
				}
			});
			buttonTask.push(task);
		}
		await Promise.all(buttonTask);

		for (const file of commandFiles) {
			const task = import(file);
			task.then((module) => {
				const command = module.default as BotCommand;
				if (command === undefined || command.data === undefined) {
					console.error(
						`File at path ${file} seems to incorrectly` +
							' be exporting a command.'
					);
				} else {
					this.commands.push(command);
				}
			});
			tasks.push(task);
		}
		await Promise.all(tasks);

		for (const file of modalFiles) {
			const task = import(file);
			task.then((module) => {
				const modal = module.default as BotModals;
				if (modal === undefined || modal.data === undefined) {
					console.error(
						`File at path ${file} seems to incorrectly` +
							' be exporting a modal.'
					);
				} else {
					this.modals.push(modal);
				}
			});
			modalTask.push(task);
		}
		await Promise.all(modalTask);

		for (const command of this.commands) {
			this.client.commands.set(command.data.name, command);
			console.log(`registered command ${command.data.name}`);
		}

		for (const modal of this.modals) {
			this.client.modal.set(modal.data.data.custom_id!, modal);
			console.log(`registered modal ${modal.name}`);
		}

		for (const buttons of this.buttons) {
			if (hasId(buttons.data.data)) {
				this.client.button.set(buttons.data.data.custom_id!, buttons);
			}
			console.log(`registered buttons ${buttons.name}`);
		}

		const payload = this.commands.map((cmd) => cmd.data);

		const rest = new REST().setToken(process.env.TOKEN!);
		await rest
			.put(
				Routes.applicationGuildCommands(
					this.client.user?.id!,
					'932659866110160936'
				),
				{ body: payload }
			)
			.then(() => console.log('successfully registered slash command'));
	}
}
