// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "quote",
    category: "image",
    allow: "all",
    timeout: 15000,
    args: "<user> <quote>",
    options: [{
        name: "user",
        type: 6,
        required: true,
        description: "The user whom you wanna opinion"
    }, {
        name: "the quote",
        type: 3,
        required: true,
        description: "The Quote dude"
    }],
    description: "get fakequote  account of those damn humans",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.member;
        let text = args.slice(1, args.length).join(" ");

        message.channel.send({
            files: [new Discord.MessageAttachment(await Canvacord.quote({
                username: user.user.username,
                message: text,
                image: user.user.displayAvatarURL({ format: "png", dynamic: false }),
            }), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }]
        })
    }
}