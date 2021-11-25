const Discord = require("discord.js");
const guildData = require("./guildData");

/**
 * 
 * @param {guildData} serverDB 
 * @param {Discord.GuildMember} member
 */
module.exports = (serverDB, member, perms = []) => {
    if (member.permissions.has("ADMINISTRATOR") || member.permissions.has("MANAGE_GUILD")) return 3;
    if (serverDB.basicConfig.admins.some(v => member.roles.cache.has(v))) return 2;
    if (serverDB.basicConfig.mods.some(v => member.roles.cache.has(v))) return 1;
    if (perms.length > 0 && member.permissions.has(perms)) return 1;

    return 0;
}