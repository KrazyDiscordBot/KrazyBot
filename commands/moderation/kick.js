// dependecnies
const Discord = require('discord.js');

// Exporting Module
module.exports = {
    name: "kick",
    category: "moderation",
    description: "kick a Server Member",
    args: "<mention a user | User ID | Username> [reason]",
    options: [
        { name: "user", required: true, type: 6, description: "The user whom you want to kick" },
        { name: "reason", required: false, type: 3, description: "Reason for kicking the user" }
    ],
    timeout: 5000,
    allow: 'mod',
    permissions: ['KICK_MEMBERS'],
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {Array} args
     */
    run: async (bot, message, args, serverDB) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((u) => (u.user.username.toLowerCase() == args.join(" ").toLowerCase() || u.nickname.toLowerCase() == args.join(" ").toLowerCase()));

        if (!user) return message.channel.send({ embeds: [{ title: "User not found", description: "Please mention an user or give their id to kick them", color: 'RED' }] });

        if (!user.kickable || message.guild.me.roles.highest.position <= user.roles.highest.position) return message.reply({ embeds: [{ title: "NOPE", description: "I can't kick this user because they are either mod or have a role higher to mine highest role", color: 'RED' }] });
        if (message.member.roles.highest.position <= user.roles.highest.position) return message.reply({ embeds: [{ title: "NOPE", description: "You do not have enough power to kick this user", color: 'RED' }] });
        if (client.getPower(serverDB, user) > 0) return message.reply({ embeds: [{ title: "NOPE", description: "I can't kick this user, Because this user is a Moderator/Admin", color: 'RED' }] });

        user.kick(  `kicked by ${message.author.username} for ${args.slice(1).join(" ")}` || "NO reason provided by " + message.author.username).then((m) => {
            message.channel.send({ embeds: [{ color: "GREEN", title: "User kicked Successfully ???" }] })
            m.user.send({ embeds: [{ color: "DARK_RED", title: "You are kicked! RIP", fields: [{ name: "Server", value: message.guild.name, inline: true }, { name: "Moderator", value: message.author.username, inline: true }, { name: "Reason", value: args.slice(1).join(" ") || "No reason", inline: true }] }] }).catch((e) => { });
        }).catch((e) => {
            message.channel.send({ embeds: [{ color: "RED", title: "I was unable to kick the user ???" }] });
        })
    }
}