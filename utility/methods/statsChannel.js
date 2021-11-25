const Discord = require('discord.js');
const { guildData, changeName } = require("../../utility");

/**
 * 
 * @param {Discord.Guild} guild 
 * @param {guildData} serverDB 
 */
module.exports = (guild, serverDB) => {
    let channel = guild.channels.cache.get(serverDB.statsConfig.channel);
    if (!channel) return;

    channel.setName(changeName(channel.name, guild.channels.cache.size), "To Show Server Stats");
}