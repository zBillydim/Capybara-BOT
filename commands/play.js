const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Carrega músicas do ytb")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("song")
        .setDescription("Carrega uma única música do ytb")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("url da música")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("playlist")
        .setDescription("carrega playlist")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("playlist's url")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("Procura por musicas baseado noq digita")
        .addStringOption((option) =>
          option
            .setName("searchterms")
            .setDescription("palavras a serem procuradas")
            .setRequired(true)
        )
    ),
  async execute({ client, interaction }) {
    // continuar debugando, alterar function das outras pages de run pra async execute para nova integração, continuar o mais rapido possivel!
    console.log(client, interaction);
    if (!interaction.member.voice.channel)
      return interaction.editReply("Entra na porra de um canal filha da puta");

    const queue = await client.player.createQueue(interaction.guild);
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    let embed = new MessageEmbed();

    if (interaction.options.getSubcommand() === "song") {
      let url = interaction.options.getString("url");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
      });
      if (result.tracks.length === 0)
        return interaction.editReply("Achei nada nessa merda porra");

      const song = result.tracks[0];
      await queue.addTrack(song);
      embed
        .setDescription(
          `**[${song.title}](${song.url})** foi adicionado a fila`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` });
    } else if (interaction.options.getSubcommand() === "playlist") {
      let url = interaction.options.getString("url");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST,
      });

      if (result.tracks.length === 0)
        return interaction.editReply("No results");

      const playlist = result.playlist;
      await queue.addTracks(result.tracks);
      embed
        .setDescription(
          `**${result.tracks.length} músicas dê [${playlist.title}](${playlist.url})** foi adicionado a fila`
        )
        .setThumbnail(playlist.thumbnail);
    } else if (interaction.options.getSubcommand() === "search") {
      let url = interaction.options.getString("searchterms");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });

      if (result.tracks.length === 0)
        return interaction.editReply("No results");

      const song = result.tracks[0];
      await queue.addTrack(song);
      embed
        .setDescription(
          `**[${song.title}](${song.url})**  foi adicionado a fila`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Tempo: ${song.duration}` });
    }
    if (!queue.playing) await queue.play();
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
