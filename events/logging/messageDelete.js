const servermodel = require("../../models/server");
const Discord = require('discord.js');

module.exports = (message) => {
    let data = await servermodel.findOne({ Guildid: message.guild.id });

    // Ghost Snipes
    if (message.mentions.members.first() || message.mentions.roles.first()) {
        const snipes = message.client.gsnipe.get(message.channel.id) || [];
        snipes.unshift({
            content: message.content == "" ? "It is an embed" : message.content,
            user: message.author.id,
            date: new Date().toLocaleString("en-GB", {
                dataStyle: "full",
                timeStyle: "short"
            })
        });
        message.client.gsnipe.set(message.channel.id, snipes);
    }

    // Normal snipes
    const _snipes = message.client.snipe.get(message.channel.id) || [];
    _snipes.unshift({
        content: message.content == "" ? "It is an embed" : message.content,
        user: message.author.id,
        date: new Date().toLocaleString("en-GB", {
            dataStyle: "full",
            timeStyle: "short"
        })
    });

    message.client.snipe.set(message.channel.id, _snipes);

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription(
            "Message Deleted in " +
            `<#${message.channel.id}>\nIts content : \n\`${message.content}\``
        )
        .setFooter("Deleted At")
        .setThumbnail(message.author.avatarURL({ dynamic: true }))
        .setAuthor(
            message.author.username,
            message.author.avatarURL({ dynamic: true }),
            message.author.avatarURL({ dynamic: true })
        )
        .setTimestamp();
    message.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e => { });

}