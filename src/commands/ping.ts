import {Message} from "discord.js";
import {CommandHandler} from "../services/CommandHandler";

export default {
    name: "ping",
    aliases: ["pong"],
    usage: "[command]",
    description: "Ping! :D",
    guildOnly: false,
    async execute(handler: CommandHandler, message: Message, args: string[]) {
        message.reply("Pong!");
    }
}