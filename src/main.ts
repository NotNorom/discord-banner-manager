import Discord from "discord.js";
import auth from "./config/auth.js";

const clientToken = auth.discord.clientToken;
const ownerId = auth.discord.ownerId;
const client = new Discord.Client();

client
.on("ready", console.log)
.on("message", console.log)
.login(clientToken)
.catch(console.log);