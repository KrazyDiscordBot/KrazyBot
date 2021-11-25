// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "brightness",
    allow: "all",
    category:"image",
    timeout: 15000,
    args: "[user]",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "User whom you want to see in brightness"
    }],
    description: "Increase brightness for someone's avatar",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.members;

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.brightness(user.user.displayAvatarURL({ format: "png", dynamic: false })),"image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}