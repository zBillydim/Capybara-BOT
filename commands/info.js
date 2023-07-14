const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("mostra as infos da música"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) return await interaction.editReply("Sem musicas na fila");

    let bar = queue.createProgressBar({
      queue: false,
      length: 19,
    });

    const song = queue.current;

    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setThumbnail(song.thumbnail)
          .setDescription(
            `Tocando agora: [${song.title}](${song.url})\n\n` + bar
          ),
      ],
    });
  },
};
