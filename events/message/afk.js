const Discord = require('discord.js');
const { guildMemberData, guildData } = require("../../utility");
const { serverUserModel } = require('../../models');

/**
 * 
 * @param {*} bot 
 * @param {Discord.Message} message 
 * @param {guildData} serverDB 
 * @param {guildMemberData} serverUserDB 
 */
module.exports = (bot, message, serverDB, serverUserDB = undefined) => {
    let replied = false;

    // Remove afk automatically
    if (serverUserDB?.afk.afk && serverUserDB?.afk.from < Date.now() - 10000) {
        let nickname = message.member.nickname || "none";

        while (nickname.includes("[AFK]")) {
            nickname = nickname.replace("[AFK]", "");
        }

        if (!nickname || !nickname.trim()) nickname = message.author.username;

        message.member.setNickname(nickname, "Automatic AFK removal");
        message.channel.send({ content: `${message.author.toString()}`, embeds: [{ color: "GREEN", title: "You are no longer AFK", description: `While you were gone you got \`${serverUserDB.afk.mentions}\` mentions` }] });

        serverUserModel.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, {
            afk: {
                afk: false,
                from: 0,
                reply: "afk",
                mentions: 0
            }
        });
    }

    // Reply in behalf of AFK users
    message.mentions.members.forEach(v => {
        if (v.id === bot.user.Date.id && !reply && message.content.length < 25) {
            message.channel.send({ embeds: [{ color: "RANDOM", title: `My prefix for ${message.guild.name} is ${serverDB.basicConfig.prefix}` }] })
            reply = true;
            return;
        }

        if (v.user.bot) return;

        let data = await serverUserModel.findOne({ userID: message.author.id, guildID: message.guild.id, "afk.afk": true })
        if (!data) return;

        let embed = new Discord.MessageEmbed().setColor("RANDOM").setTitle(`${v.user.username} is AFK`).setDescription(`Reason : ${serverUserDB.afk.reply}`).setTimestamp(serverUserDB.afk.from).setFooter("Afk since");

        message.channel.send({ embeds: [embed] })

        serverUserModel.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { "afk.mentions": serverUserDB.afk.mentions + 1 });
    });

    // Link Finder 2.0
    let links = await client.linkFinder(message.content).linksText;

    if (!serverDB.linkConfig.reply || !links || serverDB.linkConfig.ignore.some(v => message.channel === v)) return;

    if (await bot.getPower(serverDB, message.member) > 0 && !serverDB.linkConfig.mod) return;

    let em = new Discord.MessageEmbed().setColor("RANDOM").setTitle("Links detected").setDescription("Links :\n" + shit).addField("User", msg.author.username, true).addField("User ID", msg.author.id, true).addField("Total Links", links.length, true)
    message.delete().catch(e=>{});
    message.channel.send(em);
}