//require
const Discord = require("discord.js");

//export
module.exports = {
    name: "ping",
    aliases: ["latency"],
    category: "general",
    description: "Shows ping of the bot",
    usage: "k!ping",
    allow: "all",
    timeout: 10000,
    run: async (bot, message, args, touse) => {
        //code
        message.channel.send('Pinging.exe.').then((msg) => {
            let _ = new Discord.MessageEmbed()
                .setTitle("🏓Pong!🏓")
                .setDescription(`**Bot Latency:** ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\n**API Latency:** ${Math.round(bot.ws.ping)}ms`)
                .setColor("RANDOM");
            msg.edit("", { embed: _ });
        });
    }
}