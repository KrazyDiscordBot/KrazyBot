//require stuff
const Discord = require("discord.js"),
    ms = require('ms');

//export
module.exports = {
    name: "stats",
    allow: "team",
    aliases: ["bot status", "bot stats", "status"],
    category: "bot support",
    description: "shows Bot Stats",
    usage: "k!stats",
    hidden: true,
    timeout: 5000,
    perms: "\`Embed Links\`",
    note: "No special permissions are required by user",
    reply: "You can check Bot stats once in **5** seconds, Right now you have to wait for **leftt**",
    run: async (bot, message) => {
        //code
        let embed = new Discord.MessageEmbed()
            .addField(`**Servers**: `, `${bot.guilds.cache.length}`, true)
            .addField(`**Users**`, `${bot.users.cache.length}`, true)
            .addField(`**Channels: **`, `${bot.channels.cache.length}`, true)
            .addField(`**Uptime: **`, `${ms(bot.uptime)}`, true)
            .addField(`**Commands: **`, `${ms(bot.commands.size)}`, true)
            .addField(`**Categories: **`, `${ms(bot.categories.length)}`, true)
            .setTitle("Krazy Bot\'s statistics")
            .setDescription("**Bot Version: **1.9.0")
            .setColor("LUMINOUS_VIVID_PINK")
        message.channel.send(embed);
    }
}