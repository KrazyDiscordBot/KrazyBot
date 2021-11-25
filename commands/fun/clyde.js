// Requred
const Discord = require('discord.js');
const Canvacord = require('canvacord').Canvacord;

// Exports
module.exports = {
    name: "clyde",
    category:"fun",
    allow: "all",
    timeout: 15000,
    args: "<text>",
    options: [{
        name: "message",
        type: 3,
        required: false,
        description: "The message which you want clyde to say"
    }],
    description: "Make clyde say something",
    run: async (bot, message, args) => {
        let text = args.join(" ");

        message.channel.send({ files: [new Discord.MessageAttachment(await Canvacord.clyde(text),"image.png")], embeds: [{ color: "GOLD", image: "attachment://image.png" }] })
    }
}