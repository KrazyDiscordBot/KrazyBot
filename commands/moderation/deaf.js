// dependecnies
const Discord = require('discord.js');

// Exporting Module
module.exports = {
    name: "deafen",
    aliases: ["deaf"],
    category: "moderation",
    description: "Deaf a Server Member",
    args: "<mention a user | User ID | Username> [reason]",
    options: [
        { name: "user", required: true, type: 6, description: "The user whom you want to deaf" },
        { name: "reason", required: false, type: 3, description: "Reason for deafing the user" }
    ],
    timeout: 5000,
    allow: 'mod',
    permissions: ['DEAFEN_MEMBERS'],
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {Array} args
     */
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((u) => (u.user.username.toLowerCase() == args.join(" ").toLowerCase() || u.nickname.toLowerCase() == args.join(" ").toLowerCase()));

        if (!user.voice.channel) return message.channel.send({ embeds: [{ title: "This user is not in a voice channel ❌", color: 'RED' }] });
        if (user.voice.deaf) return message.channel.send({ embeds: [{ title: "This user is already deafen ❌", color: 'RED' }] });

        user.voice.setDeaf(true, `Deafen by ${message.author.username} for ${args.slice(1).join(" ")}` || "NO reason provided by " + message.author.username).then(() => {
            message.channel.send({ embeds: [{ color: "GREEN", title: "User deafen Successfully ✅" }] })
        }).catch(() => {
            message.channel.send({ embeds: [{ color: "RED", title: "I was unable to deafen the user ❌" }] });
        })
    }
}