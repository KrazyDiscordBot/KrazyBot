const Discord = require('discord.js');
const { guildData, changeName } = require("..");

/**
 * 
 * @param {Discord.Guild} guild 
 * @param {guildData} serverDB 
 */
module.exports = (guild, serverDB) => {
    let channel1 = guild.channels.cache.get(serverDB.statsConfig.bot), channel2 = guild.channels.cache.get(serverDB.statsConfig.member), channel3 = guild.channels.cache.get(serverDB.statsConfig.human), bots = 0, humans = 0;

    let all = guild.members.cache.size;
    guild.members.cache.filter(v => v.user.bot).forEach(v => bots++);

    if (channel1) channel1.setName(changeName(channel1.name, bots), "To Show Server Stats");
    if (channel2) channel2.setName(changeName(channel2.name, guild.memberCount), "To Show Server Stats");
    if (channel3) channel2.setName(changeName(channel3.name, all - bots), "To Show Server Stats");
}