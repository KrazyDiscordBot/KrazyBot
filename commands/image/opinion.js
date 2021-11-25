// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "opinion",
    category: "image",
    allow: "all",
    timeout: 15000,
    args: "<user> <text>",
    options: [{
        name: "user",
        type: 6,
        required: true,
        description: "The user whom you wanna opinion"
    },{
        name: "the text",
        type: 3,
        required: true,
        description: "The text dude"
    }],
    description: "opinion those damn humans",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.member;
        let text = args.slice(1, args.length - 1).join(" ");

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.opinion(user.user.displayAvatarURL({ format: "png", dynamic: false }),text), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}