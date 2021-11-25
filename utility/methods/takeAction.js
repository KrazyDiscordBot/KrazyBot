const Discord = require("discord.js");
const description = require("../types/punishment")

const { serverUserModel } = require("../../models");

/**
 * The function to delete message i.e. punishment zero
 * @param {Discord.Message} message 
 */
function zero(message, toDelete) {
    if (toDelete === 1) message.delete();
    else {
        message.channel.messages.cache.filter(m => m.author.id === message.author.id && m.createdTimestamp > Date.now() - 30000).forEach((v) => {
            if (toDelete > 0) {
                v.delete().catch((e) => { });
                toDelete--;
            }
        })
    }
}

/**
 * The function to warn the author i.e. punishment one
 * @param {Discord.Message} message 
 * @param {String} _module
 */
function one(message, _module) {
    description = description[_module];
    message.author.send({ embeds: [{ color: "DARK_RED", title: "Warning", footer: `Automatci warning from ${message.guild.name}`, description: description }] });
}

/**
 * The function to give strike to the author i.e. punishment two
 * @param {Discord.Message} message 
 */
function two(message) {
    serverUserModel.findOneAndUpdate({ userID: message.author.id, guildID: message.guildId }, { $inc: { "autoMod.strikes": 1 } })
}

/**
 * The function to mute the author i.e. punishment three
 * @param {*} client
 * @param {Discord.Message} message 
 */
async function three(client, message) {
    const role = await client.getMuteRole(message.guild);
    message.member.roles.add(role, "Auto Mute");

    setTimeout(() => {
        message.member.roles.remove(role)
    })
}

/**
 * The function to ban the author i.e. punishment four
 * @param {Discord.Message} message 
 */
function four(message) {
    message.member.ban({ reason: "Auto Moderation" }).catch((e) => { });
}

module.exports = async (client, message, punishments, _module, serverDB, time = 30000, toDelete = 1) => {
    let channel = message.guild.channels.cache.get(serverDB.logChannels.automodlog);

    if (channel) {
        let ar = await client.numberToPunishment(punishments);
        channel.send({ embeds: [{ color: "RANDOM", title: "Auto Moderation Action Taken", fields: [{ name: "User", value: `${message.author.username} | ${message.author.id}`, inline: true },{ name: "Actions", value: ar.join(",") || "NO actions taken", inline: true },{ name: "Channel", value: `${message.channel.name} | ${message.channel.id}`, inline: true }] }] })
    }

    punishments.forEach((v) => {
        if (v === 0) zero(message, toDelete);
        else if (v === 1) one(message, _module);
        else if (v === 2) two(message);
        else if (v === 3) three(client, message, time);
        else if (v === 4) four(message);
    });
}