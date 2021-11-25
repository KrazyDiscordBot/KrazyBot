const Discord = require('discord.js')
const servermodel = require("../../models/server");

module.exports = (member) => {
    let data = await servermodel.findOne({ Guildid: member.guild.id });

    require("../features/welcome")(member,data);
    bot.userStats(guild,data)

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription("Member Joined " + `${member.user.username}`)
        .addField("Member ID", member.id, true)
        .setThumbnail(member.user.avatarURL({ dynamic: true }))
        .setAuthor(
            member.user.username,
            member.user.avatarURL({ dynamic: true }),
            member.user.avatarURL({ dynamic: true })
        )
        .setFooter("Joined At")
        .setTimestamp();
    member.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e=>{});

}