const servermodel = require("../../models/server");
const Discord = require('discord.js');

module.exports = (oldmsg, newmsg) => {
    let data = await servermodel.findOne({ Guildid: newmsg.guild.id });

    // Edit snipe
    let snipes = oldmsg.client.editsnipe.get(oldmsg.channel.id) || [];
    snipes.unshift({
        con: oomessage.content == "" ? "It is an embed" : oomessage.content,
        content: oldmsg.content == "" ? "It is an embed" : oldmsg.content,
        user: oldmsg.author.id,
        date: new Date().toLocaleString("en-GB", {
            dataStyle: "full",
            timeStyle: "short"
        })
    });

    oldmsg.client.editsnipes.set(oldmsg.channel.id, snipes);

    let e = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setDescription("Message Edited in " + `<#${newmsg.channel.id}>`)
        .addField(
            "Old message",
            oldmsg.content == "" ? "Its an embed" : oldmsg.content,
            true
        )
        .addField(
            "New message",
            newmsg.content == "" ? "Its an embed" : newmsg.content,
            true
        )
        .addField("Jump at Message", `[Click here](${newmsg.url})`, true)
        .setAuthor(
            newmsg.author.username,
            newmsg.author.avatarURL({ dynamic: true, size: 256 }),
            newmsg.url
        )
        .setFooter("Edited At")
        .setTimestamp();
    newmsg.guild.channels.cache.get(data.logChannel.generallog).send(e).catch(e => { });
}