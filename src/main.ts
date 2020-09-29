import Discord from "discord.js";
import auth from "./config/auth.js";
import {commandHandler} from "./services/CommandHandler.js";

const clientToken = auth.discord.clientToken;
const ownerId = auth.discord.ownerId;
const client = new Discord.Client();


(async () => {
    let commands = await commandHandler.LoadCommands();
    client
        .on("ready", () => console.log("client ready"))
        .on("message", (msg) => commandHandler.Handle(msg))
        .login(clientToken)
        .catch(console.log);
})().catch(console.log);

