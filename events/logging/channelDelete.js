const Discord = require('discord.js');
const servermodel = require("../../models/server");

module.exports = async (bot, channel) => {
    if (!channel.guild) return;

    let data = await servermodel.findOne({ Guildid: channel.guild.id });

    bot.channelStats(channel.guild,data)

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription("Channel deleted " + `${channel.id}`)
        .addField("Channel ID", channel.id, true)
        .setFooter("Deleted At")
        .setAuthor(
            channel.guild.name,
            channel.guild.iconURL({ dynamic: true }),
            channel.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
    channel.guild.channels.cache.get(data.logChannels.modlog).send(e).catch(E=>{});
}