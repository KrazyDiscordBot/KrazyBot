// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "wanted",
    category: "image",
    allow: "all",
    timeout: 15000,
    args: "[user]",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "The user whs's wanted poster you wanna see"
    }],
    description: "make someone's fake wanted poster cause everybody is useless not wanted :kek:",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.member;

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.wanted(user.user.displayAvatarURL({ format: "png", dynamic: false })), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}