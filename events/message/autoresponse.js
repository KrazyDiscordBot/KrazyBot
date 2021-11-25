const Discord = require("discord.js");
const { guildData } = require("../../utility");

/**
 * 
 * @param {*} bot 
 * @param {Discord.Message} message 
 * @param {guildData} serverDB 
 */
module.exports = (bot, message, serverDB) => {
    serverDB.autoMessage.trigger.forEach(v => {
        let content = v.case ? message.content : message.content.toLowerCase();
        let move = v.include ? content.includes(v.trigger + " ") || content.endsWith(v.trigger) : content === v.trigger;

        if (!move) return;

        while(v.response.includes("{user}") == true) {
            v.response = v.response.replace("{user}", message.author.username)
        }
        while(v.response.includes("{mention}") == true) {
            v.response = v.response.replace("{mention}", message.author.toString())
        }
        while(v.response.includes("{server}") == true) {
            v.response = v.response.replace("{server}", message.guild.name)
        }

        let res = v.embed ? { embeds: [{ color: "RANDOM", description: v.response }] } : { content: v.response };

        message.channel.send(res);
    })
}