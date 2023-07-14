const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Aleatoriza a fila"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) return await interaction.editReply("Sem musicas na fila");

    queue.shuffle();
    await interaction.editReply(
      `A fila de ${queue.tracks.length} musicas foi aleatorizadas`
    );
  },
};
