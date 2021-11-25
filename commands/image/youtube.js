// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "comment",
    category: "image",
    allow: "all",
    timeout: 15000,
    args: "<user> <comment>",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "The user who's youtube fake Youtube comment you wanna generate"
    }],
    description: "get fake youtube  comment of your worst enemy/friend if you have",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.member;
        let text = args.slice(1, args.length).join(" ");

        message.channel.send({
            files: [new Discord.MessageAttachment(await Canvacord.youtube({
                username: user.user.username,
                content: text,
                avatar: user.user.displayAvatarURL({ format: "png", dynamic: false }),
                dark: Math.random() > 0.5
            }), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }]
        })
    }
}