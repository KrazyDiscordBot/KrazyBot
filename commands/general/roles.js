//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "roles",
    aliases: ["allroles", "rolelist"],
    category: "general",
    description: "Shows all roles of the server",
    allow: "all",
    timeout: 15000,
    run: async (bot, message) => {
        //code
        db.set(`data_${message.author.id}.timeout.roles`, Date.now() + 5000)
        let embed = new Discord.MessageEmbed()
            .setTitle('All Roles of ' + message.guild.name)
            .setColor('RANDOM')
            .setFooter(`There are ${message.guild.roles.cache.size} roles.`)
            .setDescription(`${message.guild.roles.cache.map(role => role.toString()).join(`\n\n`)}`)
        message.channel.send(embed);
    }
}