const Discord = require("discord.js");
const { guildData } = require("../../utility");

/**
 * 
 * @param {*} bot 
 * @param {Discord.Message} message 
 * @param {guildData} serverDB 
 */
module.exports = async (bot, message, serverDB) => {
    if (await bot.getPower(serverDB, message.member) > 0) return;
    serverDB.autoMessage.tabbo.forEach(v => {
        if (message.content.toLowerCase() === v.toLowerCase()) {
            v.delete().catch((e) => { });
            message.author.send({ embeds: [{ color: "RED", title: "Warning", description: `You are not allowed to say \`${v}\` in ${message.guild.name}` }] }).catch((e) => {
                message.channel.send({ content: `${message.author.toString()}`, embeds: [{ color: "RED", title: "Warning", description: `You are not allowed to say \`${v}\` in ${message.guild.name}` }] }).catch((e) => { })
            });
        }
    })
}