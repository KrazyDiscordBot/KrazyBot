const servermodel = require("../../models/server");
const Discord = require('discord.js');

module.exports = (member) => {
    let data = await servermodel.findOne({ Guildid: member.guild.id });

    require("../features/leave")(member,data);
    bot.userStats(guild,data)

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription("Member Left " + `${member.user.username}`)
        .addField("Member ID", member.id, true)
        .setFooter("Left At")
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setAuthor(
            member.user.username,
            member.user.avatarURL({ dynamic: true }),
            member.user.avatarURL({ dynamic: true })
        )
        .setTimestamp();
    member.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e=>{});
}