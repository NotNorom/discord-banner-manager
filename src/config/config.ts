import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const COMMANDS_FOLDER = "../commands/";
const DATA_FOLDER = "../data/";

export default {
    defaultPrefix: "b!",
    commandsFolder: path.resolve(__dirname, COMMANDS_FOLDER),
    dataFolder: path.resolve(__dirname, DATA_FOLDER),
}