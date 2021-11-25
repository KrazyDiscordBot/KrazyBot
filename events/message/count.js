const Discord = require("discord.js");
const { guildData } = require("../../utility");
const { serverModel } = require("../../models");

/**
 * 
 * @param {*} bot 
 * @param {Discord.Message} message 
 * @param {guildData} serverDB 
 */
module.exports = (bot, message, serverDB) => {
    // Catching Possible Errors
    if (message.channelId !== serverDB.countConfig.channel) return;
    if (serverDB.countConfig.by === message.author.id) {
        message.delete();
        return message.author.send({ embeds: [{ color: "RED", title: "You can't count continuously", description: `This message is from **${message.guild.name}**, because you tried to count twice in a row` }] });
    }
    if (serverDB.countConfig.at + 1 !== parseInt(message.content) || message.content.includes(".") || message.content.startsWith("0")) {
        message.delete();
        return message.author.send({ embeds: [{ color: "RED", title: "You can't count continuously", description: `This message is from **${message.guild.name}**, because you didn't counted properly\n\nPossible reasons : You used decimals, or some text or wrong number` }] });
    }

    // The real game lmao
    message.react("✅");

    serverDB.countConfig.pin.forEach(v => { if (parseInt(message.content) === v) message.pin("Automatic pin for counting game") });

    serverDB.countConfig.roleat.forEach((v, i) => { if (parseInt(message.content) === v) message.member.roles.add(message.guild.roles.cache.get(serverDB.countConfig.role[i])) });

    serverModel.findOneAndUpdate({ id: id }, { "countConfig.at": serverDB.countConfig.at + 1, "countConfig.by": message.author.id });
}