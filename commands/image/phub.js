// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "phub",
    category: "image",
    allow: "all",
    timeout: 15000,
    args: "<user> <comment>",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "The userwho's phub fake account you wanna generate"
    }],
    description: "get fakephub  account of those damn humans",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.member;
        let text = args.slice(1, args.length).join(" ");
        
        message.channel.send({
            files: [new Discord.MessageAttachment(await Canvacord.phub({
                username: user.user.username,
                comment: text,
                image: user.user.displayAvatarURL({ format: "png", dynamic: false })
            }), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }]
        })
    }
}