const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skipa a musica atual"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) return await interaction.editReply("Sem musicas na fila");

    const currentSong = queue.current;

    queue.skip();
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription(`${currentSong.title} Skipou pq corno? `)
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
};
