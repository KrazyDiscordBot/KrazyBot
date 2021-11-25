const Discord = require('discord.js');
const servermodel = require("../../models/server");

module.exports = (oldMember, newMember) => {
    let data = await servermodel.findOne({ Guildid: oldMember.guild.id });

    require("../features/autovoice")(oldMember,newMember,data);

    let name = oldMember.guild.members.cache.get(oldMember.id).user.username;
    let av = oldMember.guild.members.cache
        .get(oldMember.id)
        .user.displayAvatarURL({ dynamic: true, size: 256 });

    if (!oldMember.channel && newMember.channel) {
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(
                name +
                " joined " +
                `<#${newMember.channel.id}>` +
                " this voice channel"
            )
            .setFooter("Joined at")
            .setTimestamp()
            .setAuthor(name, av, av)
            .setThumbnail(av);
        return newMember.guild.channels.cache.get(data.logChannel.generallog).send(e).catch(e=>{});
    }
    if (oldMember.channel && !newMember.channel) {
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(
                name +
                " left " +
                `<#${oldMember.channel.id}>` +
                " this voice channel"
            )
            .setFooter("Leaved at")
            .setTimestamp()
            .setAuthor(name, av, av)
            .setThumbnail(av);
        return newMember.guild.channels.cache.get(data.logChannel.generallog).send(e).catch(e=>{});
    }
    if (
        oldMember.channel &&
        newMember.channel &&
        oldMember.channel.id !== newMember.channel.id
    ) {
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(name + " Switched Voice channel")
            .addField("From this", `<#${oldMember.channel.id}>`, true)
            .addField("\u200b", `\u200b`, true)
            .addField("to this", `<#${newMember.channel.id}>`, true)
            .setFooter("Switched at")
            .setTimestamp()
            .setAuthor(name, av, av)
            .setThumbnail(av);
        return newMember.guild.channels.cache.get(data.logChannel.generallog).send(e).catch(e=>{});
    }
}
if (data.Modlog != 0 && data.Modlog != "" && data.Modlog != undefined) {
    if (!oldMember.serverMute && newMember.serverMute) {
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(name + " Was Voice Muted")
            .setFooter("Muted at")
            .setTimestamp()
            .setAuthor(name, av, av)
            .setThumbnail(av);
        return newMember.guild.channels.cache.get(data.logChannel.generallog).send(e).catch(e=>{});
    }
    if (oldMember.serverMute && !newMember.serverMute) {
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(name + " Was Voice UnMuted")
            .setFooter("UnMuted at")
            .setTimestamp()
            .setAuthor(name, av, av)
            .setThumbnail(av);
        return newMember.guild.channels.cache.get(data.logChannel.generallog).send(e).catch(e=>{});
    }
    if (!oldMember.serverDeaf && newMember.serverMute) {
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(name + " Was Voice Deaf")
            .setFooter("Deaf at")
            .setTimestamp()
            .setAuthor(name, av, av)
            .setThumbnail(av);
        return newMember.guild.channels.cache.get(data.logChannel.generallog).send(e).catch(e=>{});
    }
    if (oldMember.serverDeaf && !newMember.serverMute) {
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setDescription(name + " Was UnDeafend")
            .setFooter("UnDeaf at")
            .setTimestamp();
        newMember.roles.cache.fo.setAuthor(name, av, av).setThumbnail(av);
        return newMember.guild.channels.cache.get(data.logChannel.generallog).send(e).catch(e=>{});
    }

}