// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "trash",
    category: "image",
    allow: "all",
    timeout: 15000,
    args: "[user]",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "The user whom you wanna trash"
    }],
    description: "show that somenody is trash because they are",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.member;

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.trash(user.user.displayAvatarURL({ format: "png", dynamic: false })), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}