const Discord = require('discord.js');
const servermodel = require("../../models/server");

module.exports = (guild, member) => {
    let data = await servermodel.findOne({ Guildid: guild.id });

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription("Member Unbanned " + `${member.username}`)
        .addField("Member ID", member.id, true)
        .setThumbnail(member.avatarURL({ dynamic: true }))
        .setAuthor(
            member.username,
            member.avatarURL({ dynamic: true }),
            member.avatarURL({ dynamic: true })
        )
        .setFooter("UnBanned At")
        .setTimestamp();

    guild.channels.cache.get(data.logChannels.modlog).send(e).catch(e=>{});

}