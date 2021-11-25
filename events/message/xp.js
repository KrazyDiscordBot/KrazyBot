const Discord = require('discord.js'), math = require('mathjs');
const { guildMemberData, guildData } = require("../../utility");
const { serverUserModel } = require('../../models');

/**
 * @param {*} bot 
 * @param {Discord.Message} message 
 * @param {guildData} serverDB 
 * @param {guildMemberData} serverUserDB 
 */
module.exports = (bot, message, serverDB, serverUserDB = undefined) => {
    if (!serverDB.levelConfig.XPSystem || serverDB.levelConfig.ignoreChannel.some(v => message.channelId === v) || serverDB.levelConfig.ignoreUser.some(v => message.author.id === v)) return;
    if (!serverUserDB) serverUserDB = await serverUserModel.create({ userID: message.author.id, guildID: message.guildID });

    let { formula, rate, wait } = serverDB.levelConfig;
    if (serverUserDB.lastXP + parseInt(wait) > Date.now()) return;

    let requiredXP = 100, currentXP = serverUserDB.XP + parseInt(Math.floor(Math.random() * 10 + 10) * rate), level = serverUserDB.level;

    while (level > 0) { requiredXP += math.evaluate(formula.replace(/lvl/g, level)); level-- };

    // Level UP
    if (currentXP >= requiredXP) {
        serverUserDB.Level++;

        // Level UP Notification
        let channel = message.guild.channels.cache.get(serverDB.levelConfig.LevelUpChannel) || message.channel, msg = serverDB.levelConfig.LevelUpMessage;
        msg = msg.replace(/{mention}/g, message.author.toString())
        msg = msg.replace(/{user}/g, message.author.username)
        msg = msg.replace(/{guild}/g, message.guild.name)
        msg = msg.replace(/{level}/g, serverUserDB.level) + "\n";

        // Role reward
        serverDB.levelConfig.roleAt.forEach((v, i) => {
            if (i !== serverUserDB.level) return;
            let role = message.guild.roles.cache.get(v);
            if (!role) return msg += "You was suppsoed to get a role reward but sadly that role no more exsists :(\n";

            message.member.roles.add(role).then(v => msg += `GG You got **${role.name}** role as an reward`).catch(v => msg += `You was supposed to get **${role.name}** role as an reward but i was unable to give it :( because either i do not have manage role perms or the role is above mine highest role`);
        });

        channel.send({ content: msg });
    }
}