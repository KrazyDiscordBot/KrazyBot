const Discord = require("discord.js");
const { guildData } = require("../../utility");

/**
 * 
 * @param {guildData} serverDB 
 * @param {Discord.GuildMember} member
 */
module.exports = (serverDB, member) => {
    if(member.permissions.has("ADMINISTRATOR") || member.permissions.has("MANAGE_GUILD"))return 3;
    if(member.permissions.has("MANAGE_MESSAGES"))return 1;

    if(serverDB.basicConfig.admins.some(v=>member.roles.cache.has(v)))return 2;
    if(serverDB.basicConfig.mods.some(v=>member.roles.cache.has(v)))return 1;

    return 0;
}