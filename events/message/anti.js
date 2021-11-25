const Discord = require("discord.js");
const det = require("gibberish-detector");
const { guildData, guildMemberData } = require("../../utility");
const { serverUserModel } = require("../../models");

/**
 * 
 * @param {*} bot 
 * @param {Discord.Message} message 
 * @param {guildData} serverDB 
 * @param {guildMemberData} serverUserDB 
 */
module.exports = (bot, message, serverDB, serverUserDB) => {
    // Checking if we have to use Anti System
    if (message.member.permissions.has("ADMINISTRATOR") || message.member.permissions.has("MANAGE_GUILD") || serverDB.autoMod.ignoreChannel.includes(message.channelId) || message.member.roles.cache.some((v) => serverDB.autoMod.ignoreRole.includes(v.id))) return;
    if (!serverDB.autoMod.caps.enabled && !serverDB.autoMod.dublicate.enabled && !serverDB.autoMod.emojis.enabled && !serverDB.autoMod.images.enabled && !serverDB.autoMod.links.enabled && !serverDB.autoMod.spam.enabled) return;

    if (!serverUserDB) serverUserDB = await serverUserModel.create({ userID: message.author.id, guildID: message.guildId });

    // Adding the new message in the database
    serverUserDB?.autoMod.messages.push({ at: message.createdTimestamp, content: message.content });

    // removing the old messages if needed
    if (serverUserDB?.autoMod.messages.length > 6) serverUserDB.autoMod.messages.pop();

    // Anti Caps
    if (serverDB.autoMod.caps.enabled) {
        let per = await bot.capsPercentage(message.content);
        if (per >= serverDB.autoMod.caps.count) bot.takeAction(bot, message, serverDB.autoMod.caps.punishment, "caps", serverDB.autoMod.caps.time, 1);
    }

    // Anti Dublicate messages
    if (serverDB.autoMod.dublicate.enabled) {
        let allow = serverDB.autoMod.dublicate.count, sent = 0;
        let msgs = serverUserDB.autoMod.messages.filter((v) => v.at > Date.now() - 25000);
        let last = msgs[msgs.length - 1].content.toLowerCase();

        for (let i = msgs.length - 2; i >= 0; i--) {
            if (msgs[i].content.toLowerCase() === last) sent++;
        }

        if (sent >= allow) bot.takeAction(bot, message, serverDB.autoMod.dublicate.punishment, "dub", serverDB.autoMod.dublicate.time, sent);
    }

    // Anti Emojis 
    if (serverDB.autoMod.emojis.enabled) {
        const pattern = /(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/, emojis = 0;
        let content = message.content.split(" ");

        content.forEach(v => {
            if (pattern.test(v)) emojis++;
        });

        if (emojis >= serverDB.autoMod.emojis.count) bot.takeAction(bot, message, serverDB.autoMod.emojis.punishment, "emoji", serverDB.autoMod.emojis.time, 1);
    }

    // Anti Image Spam
    if (serverDB.autoMod.images.enabled) {
        let allow = serverDB.autoMod.images.count, images = 0;

        message.attachments.forEach((v) => {
            let ext = ["JPG", "PNG", "GIF", "WEBP", "TIFF", "PSD", "RAW", "BMP", "HEIF", "INDD", "JPEG", "SVG", "AI", "EPS", "PDF"];

            if (ext.some(ex => v.name.toUpperCase.endsWith(ex))) images++;
        });

        if (images >= allow) bot.takeAction(bot, message, serverDB.autoMod.images.punishment, "images", serverDB.autoMod.images.time, 1);
    }

    // Anti Links
    if (serverDB.autoMod.links.enabled) {
        let links = await client.linkFinder(message.content).links;

        if (links >= serverDB.autoMod.links.count) bot.takeAction(bot, message, serverDB.autoMod.links.punishment, "link", serverDB.autoMod.links.time, 1);
    }

    // Anti Message spam
    if (serverDB.autoMod.spam.enabled) {
        let time = serverDB.autoMod.spam.inTime, allow = serverDB.autoMod.spam.allowed, msgs = serverUserDB.autoMod.messages.filter(v => v.at >= Date.now() - time);

        if (msgs.length > allow) {
            bot.takeAction(bot, message, serverDB.autoMod.spam.punishment, "spam", serverDB.autoMod.spam.time, msgs.length);
        } else {
            if (det.detect(message.content) > 50) bot.takeAction(bot, message, serverDB.autoMod.spam.punishment, "spam", serverDB.autoMod.spam.time, 1);
        }
    }

    let newMsgs = serverUserDB.autoMod.messages.filter((v) => v.at > Date.now() - 25000);

    serverUserModel.findOneAndUpdate({ userID: message.author.id, guildID: message.guildId }, { "autoMod.messages": newMsgs });
}