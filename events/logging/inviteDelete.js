const servermodel = require("../../models/server");
const Discord = require('discord.js');

module.exports = (invite) => {
    let data = await servermodel.findOne({ Guildid: invite.guild.id });

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription("Invite Deleted " + `${invite.code} / \`${invite.url}\``)

        .setFooter("Deleted At")
        .setTimestamp();
    invite.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e => { });
}