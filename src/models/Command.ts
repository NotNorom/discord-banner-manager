import {Message} from "discord.js";
import CommandHandler from "../services/CommandHandler";

export default interface Command {
    name: string;
    aliases?: string[];
    usage: string;
    description: string;
    guildOnly?: boolean;
    execute: (handler: CommandHandler , message: Message, args: string[]) => void;
}