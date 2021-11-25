const Discord = require("discord.js");
const { serverModel } = require("../../models");
const { guildData } = require("../../utility");

/**
 * @param {Discord.MessageReaction} reaction 
 * @param {Discord.User} user 
 * @param {guildData} serverDB 
 */
module.exports = (reaction, user, serverDB) => {
    serverDB = await serverModel.findOne({ id: reaction.message.guildId });

    let ticketdb = serverDB.ticket;
    ticketdb.panel.forEach((v, i) => {
        if ((v.emoji !== reaction.emoji.name && v.emoji !== reaction.emoji.id) || v.msg !== reaction.message.id) return;

        let member = reaction.message.guild.members.cache.get(user.id), name = v.chname, category = reaction.message.guild.channels.cache.get(v.categoryClose), overwrites = [{
            id: reaction.message.guild.roles.everyone.id,
            deny: ["VIEW_CHANNEL"],
            type: "role"
        }, {
            id: user.id,
            allow: ["VIEW_CHANNEL"],
            type: "member"
        },
        ], openMessage = v.open, tickets = 0;

        if (v.ignored.some(vv => member.roles.cache.has(vv))) return user.send({ embeds: [{ color: "RED", title: "You don't have access to make tickets from this panel", fields: [{ name: "From Server", value: reaction.message.guild.name, inline: true }] }] });;

        v.channels.forEach(vv => { if (vv.user === user.id) tickets++ });

        if (tickets >= v.limit) return user.send({ embeds: [{ color: "RED", title: "You can't make more tickets from this panel", fields: [{ name: "From Server", value: reaction.message.guild.name, inline: true }] }] });

        v.mod.forEach(vv => {
            overwrites.push({
                id: vv,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                type: "role"
            })
        });

        name = name.replace(/{username}/g, user.username);
        name = name.replace(/{index}/g, v.channels.length);

        if (name.length >= 32) name = name.substring(0, 31);

        reaction.message.guild.channels.create(name, {
            type: "GUILD_TEXT",
            parent: category,
            reason: "Automatic ticket genrated for " + user.username,
            permissionOverwrites: overwrites,
            topic: "Automatic ticket genrated for " + user.username,
        }).catch(e => { }).then(cha => {
            ticketdb.panel[i].channels.push({ user: user.id, id: cha.id })
            serverModel.findOneAndUpdate({ id: reaction.message.guildId }, { ticket: ticketdb });

            while (openMessage.includes("{mention}")) openMessage = openMessage.replace("{mention}", user.toString());
            while (openMessage.includes("{user}")) openMessage = openMessage.replace("{user}", user.username);
            while (openMessage.includes("{guild}")) openMessage = openMessage.replace("{guild}", reaction.message.guild.name);

            cha.send({ content: openMessage });
        })
    })
}