const servermodel = require("../../models/server");
const Discord = require('discord.js');

module.exports = (some,msg) => {
    let l = [];
    some.forEach(m => {
        l.push(m.id);
    });

    if (!some) return;
    let data = await servermodel.findOne({ Guildid: msg.guild.id });

        let ll;
        if (some == null) {
            ll = 1;
        } else {
            ll = some.length;
        }
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(
                l.length + " messages Deleted in " + `<#${some.first().channel.id}>`
            )
            .setFooter("Bulk Delete At")
            .setThumbnail(some.first().guild.iconURL({ dynamic: true }))
            .setAuthor(
                some.first().guild.name,
                some.first().guild.iconURL({ dynamic: true }),
                some.first().guild.iconURL({ dynamic: true })
            )
            .setTimestamp();
            some
                .first()
                .guild.channels.cache.get(data.logChannel.modlog)
                .send(e).catch(e=>{});
}