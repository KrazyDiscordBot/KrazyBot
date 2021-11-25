// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "invert",
    category: "image",
    allow: "all",
    timeout: 15000,
    args: "<user>",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "an user who's avatar you wanna invert"
    }],
    description: "it is an command to invert someone's avatar",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.member;

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.invert(user.user.displayAvatarURL({ format: "png", dynamic: false })), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}