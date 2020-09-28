import {Message, MessageEmbed} from "discord.js";
import CommandHandler from "../services/CommandHandler";

export default {
    name: "help",
    aliases: ["list", "commands"],
    usage: "[command] <name>",
    description: "Get a list of all commands and help for a specific command",
    async execute(handler: CommandHandler, msg: Message, args: string[]) {
        if(args.length !== 0) {
            const name = args[0].toLocaleLowerCase();
            const command = await handler.GetCommand(name);

            if(!command) return msg.reply("Not a valid command!");

            const embed = new MessageEmbed().setTitle(command.name).setColor("#ffffff");
            
            if(command.aliases) embed.addField("Aliases", command.aliases.join(", "));
            if(command.usage) embed.addField("Usage", command.usage);
            if(command.description) embed.addField("Description", command.description);
            if(command.guildOnly) embed.addField("Guild Only", command.guildOnly);
            return msg.channel.send(embed);
        }


        const embed = new MessageEmbed()
            .setTitle("Help")
            .setColor("#ffffff")
            .addField("Commands", handler.commands.map(cmd => cmd.name).join(", "))

        return msg.author.send(embed)
            .then(() => {
                if (msg.channel.type === "dm") return;
                msg.react("✅");
            }).catch((e) => {
                console.error(e)
                msg.reply("I can't DM you. Are your DM's disabled?")
            });
    }
}