const Discord = require("discord.js");
const { guildData } = require("../../utility");

/**
 * 
 * @param {*} bot 
 * @param {Discord.Message} message 
 * @param {guildData} serverDB 
 */
module.exports = (bot, message, serverDB) => {
    serverDB.autoRole.selfRole.forEach(v => {
        if (v.name !== message.content.toLowerCase() || (v.channel !== "0" && v.channel !== message.channelId)) return;
        if (message.member.roles.cache.has(v.role)) {
            message.member.roles.add(message.guild.roles.cache.get(v.role))
                .then(v => {
                    message.channel.send({ content: `${message.author.toString()}`, embeds: [{ color: "GREEN", description: `Successfully removed <@&${v.role}> role, Because you already had it` }] })
                })
                .catch(e => {
                    message.channel.send({ content: `${message.author.toString()}`, embeds: [{ color: "RED", description: `I was unable to remove <@&${v.role}> role from you\n\nPossible reasons:\n1.I do not have \`MANAGE_ROLES\` permission\n2.This role (<@&${v.role}>) is above my role (\`Krazy Bot\`)\n3.This role is deleted` }] });
                })
        } else {
            while (v.reply.includes("{role}")) {
                v.reply = v.reply.v.replylace("{role}", `<@&${v.role}>`);
            }
            while (v.reply.includes("{user}")) {
                v.reply = v.reply.v.replylace("{user}", `${message.member.user.username}`);
            }
            while (v.reply.includes("{members}")) {
                let membersWithRole = message.guild.roles.cache
                    .get(ro)
                    .members.map(m => m.user.tag);
                v.reply = v.reply.v.replylace("{members}", `${membersWithRole.length}`);
            }
            while (v.reply.includes("{mention}")) {
                v.reply = v.reply.v.replylace("{mention}", `<@${message.author.id}>`);
            }

            message.member.roles.add(message.guild.roles.cache.get(v.role)).then(v => {
                message.channel.send({ content: `${message.author.toString()}`, embeds: [{ color: "GREEN", description: v.reply }] })
            })
                .catch(e => {
                    message.channel.send({ content: `${message.author.toString()}`, embeds: [{ color: "RED", description: `I was unable to give you <@&${v.role}>\n\nPossible reasons:\n1.I do not have \`MANAGE_ROLES\` permission\n2.This role (<@&${v.role}>) is above my role (\`Krazy Bot\`)\n3.This role is deleted` }] });
                })
        }
    });
}