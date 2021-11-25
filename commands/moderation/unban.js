// dependecnies
const Discord = require('discord.js');

// Exporting Module
module.exports = {
    name: "unban",
    category: "moderation",
    description: "Unban a Discord User",
    args: "<mention a user | User ID | Username> [reason]",
    options: [
        { name: "user", required: true, type: 6, description: "The user whom you want to unban" },
        { name: "reason", required: false, type: 3, description: "Reason for unbanning the user" }
    ],
    timeout: 5000,
    allow: 'mod',
    permissions: ['BAN_MEMBERS'],
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {Array} args
     */
    run: async (bot, message, args) => {
        let user = message.mentions.users.first() || message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((u) => (u.user.username.toLowerCase() == args.join(" ").toLowerCase() || u.nickname.toLowerCase() == args.join(" ").toLowerCase()));

        if (!message.guild.bans.cache.has(user.id)) return message.channel.send({ embeds: [{ title: "This user is not banned ❌", color: 'RED' }] });

        message.guild.bans.cache.forEach(v => {
            if (v.user.id === user.id) message.guild.bans.remove(v.user, `Banned by ${message.author.username} for ${args.slice(1).join(" ")}` || "NO reason provided by " + message.author.username).then(() => {
                message.channel.send({ embeds: [{ color: "GREEN", title: "User unbanned Successfully ✅" }] })
                m.user.send({ embeds: [{ color: "DARK_RED", title: "You are unbanned! GG", fields: [{ name: "Server", value: message.guild.name, inline: true }, { name: "Moderator", value: message.author.username, inline: true }, { name: "Reason", value: args.slice(1).join(" ") || "No reason", inline: true }] }] }).catch((e) => { });
            }).catch(() => {
                message.channel.send({ embeds: [{ color: "RED", title: "I was unable to unban the user ❌" }] });
            })
        })

    }
}