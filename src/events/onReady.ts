import AspectxBot from "../structures/bot";
import BotCommand from "../structures/BotCommand";
import { buttonFiles, commandFiles, modalFiles } from "../utils/files";
import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/rest/v10';
import BotEvent from "../structures/BotEvents";
import BotModals from "../structures/BotModals";
import botButtons from "../structures/BotButtons";

export default class onReadyEvent extends BotEvent<'ready'> {
    commands: BotCommand[]
    modals: BotModals[]
    buttons: botButtons[]

    constructor(client: AspectxBot) {
        super(client)
        this.commands = []
        this.modals = []
        this.buttons = []
    }

    public async execute(): Promise<void> {
        console.clear()
        await console.log(`logged in to ${this.client.user?.username}`)

        let tasks: Promise<unknown>[] = [];
        let modalTask: Promise<unknown>[] = []
        let buttonTask: Promise<unknown>[] = []

        for(let i = 0; i < buttonFiles.length; i += 1 ) {
            const file = buttonFiles[i]
            const task = import(file)
            task.then((module) => { 
                const button = module.default as botButtons;
                if (button === undefined || button.data === undefined) {
                    console.error(
                        `File at path ${file} seems to incorrectly` +
                            " be exporting a button."
                    );
                } else {
                    this.buttons.push(button);
                }
            });
            buttonTask.push(task)
        }
        await Promise.all(buttonTask)

        for(let i = 0; i < commandFiles.length; i += 1 ) {
            const file = commandFiles[i]
            const task = import(file)
            task.then((module) => { 
                const command = module.default as BotCommand;
                if (command === undefined || command.data === undefined) {
                    console.error(
                        `File at path ${file} seems to incorrectly` +
                            " be exporting a command."
                    );
                } else {
                    this.commands.push(command);
                }
            });
            tasks.push(task)
        }
        await Promise.all(tasks)

        for(let i = 0; i < modalFiles.length; i += 1 ) {
            const file = modalFiles[i]
            const task = import(file)
            task.then((module) => { 
                const modal = module.default as BotModals;
                if (modal === undefined || modal.data === undefined) {
                    console.error(
                        `File at path ${file} seems to incorrectly` +
                            " be exporting a modal."
                    );
                } else {
                    this.modals.push(modal)
                }
            });
            modalTask.push(task)
        }
        await Promise.all(modalTask)


        for (let i = 0; i < this.commands.length; i += 1) {
            const command = this.commands[i];
            this.client.commands.set(command.data.name, command);
            console.log(`registered command ${command.data.name}`)   
        }

        for (let i = 0; i < this.modals.length; i += 1) {
            const modal = this.modals[i];
            this.client.modal.set(modal.data.customId!, modal);
            console.log(`registered modal ${modal.name}`)   
        }

        for (let i = 0; i < this.buttons.length; i += 1) {
            const buttons = this.buttons[i];
            this.client.button.set(buttons.data.customId!, buttons);
            console.log(`registered buttons ${buttons.name}`)   
        }

        const payload = this.commands.map((cmd) => cmd.data);

        const rest = new REST().setToken(process.env.TOKEN!)
        await rest.put(Routes.applicationGuildCommands(this.client.user?.id!, '932659866110160936'), {body: payload}).then(() => console.log('successfully registered slash command'))
    }
}