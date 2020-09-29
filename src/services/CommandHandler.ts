import fs from "fs";
import Discord from "discord.js";
import Command from "../models/Command";
import config from "../config/config.js";


export class CommandHandler {
    public commands: Discord.Collection<string, Command>;
    public prefixOverrides: Discord.Collection<Discord.Snowflake, string>;

    constructor() {
        this.commands = new Discord.Collection();
        this.prefixOverrides = new Discord.Collection();
    }

    public async GetPrefix(msg: Discord.Message): Promise<string> {
        if(!msg.guild) return config.defaultPrefix;
        if(!this.prefixOverrides.has(msg.guild.id)) return config.defaultPrefix;
        return this.prefixOverrides.get(msg.guild.id);
    }

    public async SetPrefix(msg: Discord.Message, prefix: string): Promise<string> {
        if(!msg.guild) return;
        this.prefixOverrides.set(msg.guild.id, prefix);
        return prefix;
    }

    public async GetCommand(commandName: string) {
        return this.commands.get(commandName) || this.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    }
    
    public async LoadCommands(): Promise<Discord.Collection<string, Command>> {
        const {commandsFolder} = config;
        const commandFiles = fs.readdirSync(commandsFolder).filter(file => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command: Command = (await import(`../commands/${file}`)).default;
            this.commands.set(command.name, command);
        }
        return this.commands;
    }

    public async Handle(msg: Discord.Message): Promise<Discord.Message> {
        if (msg.author.bot) return;
        
        const prefix = await this.GetPrefix(msg);
        if (!msg.content.startsWith(prefix)) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = await this.GetCommand(commandName);
        if (!command) return;

        if (command.guildOnly && msg.channel.type === "dm") {
            return msg.reply("I can't execute that command inside DMs!");
        }
        

        try {
            command.execute(this, msg, args);
        } catch (error) {
            console.error(error);
            msg.reply("Sorry mate, I fucked something up");
        } finally {
            return msg;
        }
    }
}

export const commandHandler = new CommandHandler();