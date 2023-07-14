const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipto")
    .setDescription("Skipa pra uma música especifíca")
    .addNumberOption((option) =>
      option
        .setName("tracknumber")
        .setDescription("Número da musica a ser skipada")
        .setMinValue(1)
        .setRequired(true)
    ),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) return await interaction.editReply("Sem musicas na fila");

    const trackNum = interaction.options.getNumber("tracknumber");
    if (trackNum > queue.tracks.length)
      return await interaction.editReply("Número da música inválida");
    queue.skipTo(trackNum - 1);

    await interaction.editReply(`Pulou para a música: ${trackNum}`);
  },
};
