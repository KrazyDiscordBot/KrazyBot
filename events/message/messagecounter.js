const Discord = require("discord.js");
const { guildMemberData } = require("../../utility");
const { serverUserModel } = require("../../models");

/**
 * 
 * @param {*} bot 
 * @param {Discord.Message} message 
 * @param {guildMemberData} serverUserDB 
 */
module.exports = (bot, message, serverUserDB) => {
    if (!serverUserDB || !serverUserDB.track) return;

    let logs = serverUserDB.logs;
    logs.messageTotal++;

    // Daily Message Counter
    if (logs.startToday >= Date.now() - 24 * 60 * 60 * 100) logs.messageToday++;
    else {
        logs.startToday = Date.now();
        logs.messageToday = 1;
    }

    // Weekly Message Counter
    if (logs.startWeek >= Date.now() - 7 * 24 * 60 * 60 * 100) logs.messageWeek++;
    else {
        logs.startWeek = Date.now();
        logs.messageWeek = 1;
    }

    // Monthly Message Counter
    if (logs.startMonth >= Date.now() - 30 * 24 * 60 * 60 * 100) logs.messageMonth++;
    else {
        logs.startMonth = Date.now();
        logs.messageMonth = 1;
    }

    serverUserModel.findOneAndUpdate({ userID: message.author.id, guildID: message.guildId }, { logs: logs });
}