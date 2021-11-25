// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    category:"image",
    name: "bed",
    allow: "all",
    timeout: 15000,
    args: "<user>",
    options: [{
        name: "user",
        type: 6,
        required: true,
        description: "User for this command"
    }],
    description: "Get on bed with someone",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase());

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.bed(message.member.user.displayAvatarURL({ format: "png", dynamic: false }),user.user.displayAvatarURL({ format: "png", dynamic: false }))),"image.png"], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}