const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Continua a musica"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) return await interaction.editReply("Sem musicas na fila");

    queue.setPaused(false);
    await interaction.editReply(
      "Pauso a música pq corno? escreve /pause para continua essa merda"
    );
  },
};
