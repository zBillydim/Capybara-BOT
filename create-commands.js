const { REST, Routes } = require("discord.js");
//token .env
const dotenv = require("dotenv");
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const fs = require("node:fs");
const path = require("node:path");
const commandsPath = path.join(__dirname, "commands");
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandsFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data);
}
// rest / data

const rest = new REST({ version: "10" }).setToken(TOKEN);

// post to disc

(async () => {
  try {
    console.log(`Resetando ${commands.length} comandos...`);
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );
    console.log("Comandos registrados");
  } catch (error) {
    console.error(error);
  }
})();
