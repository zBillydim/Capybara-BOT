const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("sexo").setDescription("sexo!?"),

  async execute(interaction) {
    await interaction.reply("pong");
  },
};
