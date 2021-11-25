const servermodel = require("../../models/server");
const Discord = require('discord.js');

module.exports = (role) => {
    let data = await servermodel.findOne({ Guildid: role.guild.id });

    bot.roleStats(role.guild, data)

    let e = new Discord.MessageEmbed()
        .setColor(role.hexColor)
        .setDescription("Role Deleted " + `${role.name}`)
        .addField("Color", role.hexColor, true)
        .addField("Hoist", role.hoist, true)
        .addField("ID", role.id, true)
        .setFooter("Deleted At")
        .setThumbnail(role.guild.iconURL({ dynamic: true }))
        .setAuthor(
            role.guild.name,
            role.guild.iconURL({ dynamic: true }),
            role.guild.iconURL({ dynamic: true })
        )
        .setTimestamp();
    role.guild.channels.cache.get(data.logChannel.modlog).send(e);

}