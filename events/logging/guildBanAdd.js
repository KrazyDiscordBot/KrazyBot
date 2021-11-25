const Discord = require('discord.js');
const servermodel = require("../../models/server");

module.exports = (guild, member) => {
    let data = await servermodel.findOne({ Guildid: guild.id });

    bot.userStats(guild,data)

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(member.avatarURL({ dynamic: true }))
        .setAuthor(
            member.username,
            member.avatarURL({ dynamic: true }),
            member.avatarURL({ dynamic: true })
        )
        .setDescription("Member banned " + `${member.username}`)
        .addField("Member ID", member.id, true)
        .setFooter("Banned At")
        .setTimestamp();
    guild.channels.cache.get(data.logChannels.modlog).send(e).catch(e => { });
}