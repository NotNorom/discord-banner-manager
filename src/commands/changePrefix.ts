import {Message, MessageEmbed} from "discord.js";
import {CommandHandler} from "../services/CommandHandler";

export default {
    name: "prefix",
    usage: "[command] <new prefix>",
    description: "Gets or sets a guild specific prefix",
    guildOnly: true,
    async execute(handler: CommandHandler, msg: Message, args: string[]) {
        const embed = new MessageEmbed()
            .setColor("#ffffff")
            .setTitle("Prefix")
        
        if (!args.length) {
            embed.addField("Current prefix", await handler.GetPrefix(msg))
            return msg.channel.send(embed);
        }
        const oldPrefix = handler.GetPrefix(msg);
        const newPrefix = args[0];
        handler.SetPrefix(msg, newPrefix);
        embed.addField("Old prefix:", oldPrefix);
        embed.addField("New prefix:", newPrefix);
        return msg.channel.send(embed);
    }
}