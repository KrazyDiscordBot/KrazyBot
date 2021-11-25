const { GuildMember, BaseGuildTextChannel } = require("discord.js");
const { guildData, getPower } = require('./');

/**
 * 
 * @param {GuildMember} member 
 * @param {BaseGuildTextChannel} channel 
 * @param {guildData} serverDB 
 * @exports Boolean
 */
module.exports = (member, channel, command, serverDB) => {
    /**
     * User
     * Channel
     * Role
     * Command
     */

    allow = 0;

    if (getPower(serverDB, member) > 1 || serverDB.basicConfig.enableUserCommand.some(v => v.user === member.user.id && v.commands.some(c => c === comand || c === "all"))) return true;

    if (serverDB.basicConfig.disableUserCommand.some(v => v.user === member.user.id && v.commands.some(c => c === comand || c === "all")) || serverDB.basicConfig.disableRoleCommand.some(v => v.channel === channel.id && v.commands.some(v => v === command || v === "all"))) return false;

    if (serverDB.basicConfig.disableChannelCommand.some(v => v.channel === channel.id && v.commands.some(v => v === command || v === "all"))) allow = 2;
    if (serverDB.basicConfig.disabledCommand.some(v => v === command)) allow = 1;

    if (allow > 0 && (serverDB.basicConfig.enableChannelCommand.some(v => v.channel === channel.id && v.commands.some(v => v === command || v === "all")) || serverDB.basicConfig.enableRoleCommand.some(v => v.channel === channel.id && v.commands.some(v => v === command || v === "all")))) allow = 0;
    
    return allow === 0;
}