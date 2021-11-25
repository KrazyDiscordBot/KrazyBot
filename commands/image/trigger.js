// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "trigger",
    category: "image",
    allow: "all",
    timeout: 15000,
    args: "[user]",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "The user whom you wanna trigger"
    }],
    description: "Trigger a nerd, because i am giving you this power btw thanks to canvacord",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.member;

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.trigger(user.user.displayAvatarURL({ format: "png", dynamic: false })), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}