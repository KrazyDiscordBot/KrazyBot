// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "ohno",
    category: "fun",
    allow: "all",
    timeout: 15000,
    args: "<text>",
    options: [{
        name: "text",
        type: 3,
        required: false,
        description: "The text xD"
    }],
    description:"Oh no on something lolll",
    run: async (bot, message, args) => {
        let text = args.join(" ");

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.ohno(text),"image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}