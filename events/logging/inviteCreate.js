const servermodel = require("../../models/server");
const Discord = require('discord.js');

module.exports = (invite) => {
    let data = await servermodel.findOne({ Guildid: invite.guild.id });

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(
            "New invite Created " + `${invite.code} / \`${invite.url}\``
        )
        .addField("By", invite.inviter.username, true)
        .addField("For", `<#${invite.channel.id}>`, true)
        .setThumbnail(invite.inviter.avatarURL({ dynamic: true }))
        .setAuthor(
            invite.inviter.username,
            invite.inviter.avatarURL({ dynamic: true }),
            invite.inviter.avatarURL({ dynamic: true })
        )
        .addField("Expiry", invite.expiresAt, true)
        .setFooter("Created At")
        .setTimestamp();
        invite.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e=>{});
}