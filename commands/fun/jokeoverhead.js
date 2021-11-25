// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "jokeoverhead",
    aliases: ["joh"],
    category: "fun",
    allow: "all",
    timeout: 15000,
    args: "<text>",
    options: [{
        name: "USER",
        type: 6,
        required: false,
        description: "The USER DAMN IT. xD"
    }],
    description: "Create the joke over head meme on some-one",
    run: async (bot, message, args) => {
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(v => v.name.toLowerCase() === args.join(" ")?.toLowerCase()) || message.members;

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.jokeoverhead(user.user.displayAvatarURL({ dynamic: false, format: "png" })), "image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}