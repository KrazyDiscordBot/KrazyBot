const Discord = require('discord.js');
const { guildData, changeName } = require("..");

/**
 * 
 * @param {Discord.Guild} guild 
 * @param {guildData} serverDB 
 */
module.exports = (guild, serverDB) => {
    let channel = guild.channels.cache.get(serverDB.statsConfig.role);
    if (!channel) return;

    channel.setName(changeName(channel.name, guild.roles.cache.size), "To Show Server Stats");
}