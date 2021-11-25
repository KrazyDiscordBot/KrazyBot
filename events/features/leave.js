const Discord = require('discord.js');
const { guildData, createLeaveImage, delay } = require("../../utility");

/**
 * 
 * @param {Discord.GuildMember} member
 * @param {guildData} serverDB 
 */
module.exports = async (member, serverDB) => {
    // Leave Message
    let channel = member.guild.channels.cache.get(serverDB.leaveConfig.channel), attachment;
    if (!channel || !channel.sendable || (!serverDB.leaveConfig.show_image && !serverDB.leaveConfig.show_message)) return;

    if (serverDB.leaveConfig.show_image) attachment = await createLeaveImage(serverDB, member);
    let message = serverDB.leaveConfig.show_message ? serverDB.leaveConfig.message : "\u200b", images = attachment ? [attachment] : [];

    message = message.replace(/user/g, member.user.username);
    message = message.replace(/guild/g, member.guild.name);
    message = message.replace(/mention/g, member.user.toString());
    message = message.replace(/members/g, member.guild.memberCount);

    if (serverDB.leaveConfig.embed) channel.send({ files: images, embeds: [{ color: serverDB.leaveConfig.embed_color, image: serverDB.leaveConfig.embed_image, description: message }] });
    else channel.send({ files: images, content: message });
}