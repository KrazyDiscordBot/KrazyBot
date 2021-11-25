const Discord = require('discord.js');
const { guildData, createWelcomeImage, delay } = require("../../utility");

/**
 * 
 * @param {Discord.GuildMember} member
 * @param {guildData} serverDB 
 */
module.exports = async (member, serverDB) => {
    await delay(parseInt(serverDB.welcomeConfig.delay));

    // Auto Name Changer
    if (serverDB.welcomeConfig.joinName !== "") {
        let name = serverDB.welcomeConfig.joinName.replace(/{username}/g, member.user.username);
        member.setNickname(name.length > 32 ? name.substring(0, 31) : name, "Automatic name changer").catch(e => { });
    }

    // Auto Bot's Role adder
    if (member.user.bot) {
        serverDB.welcomeConfig.bot.forEach(v => {
            member.roles.add(member.guild.roles.cache.get(v)).catch(e => { });
        })
    }

    // Auto Humans's Role adder
    if (!member.user.bot) {
        serverDB.welcomeConfig.human.forEach(v => {
            member.roles.add(member.guild.roles.cache.get(v)).catch(e => { });
        })
    }

    // Welcome Message
    let channel = member.guild.channels.cache.get(serverDB.welcomeConfig.channel), attachment;
    if (!channel || !channel.sendable || (member.user.bot && !serverDB.welcomeConfig.welcomeBots) || (!serverDB.leaveConfig.show_image && !serverDB.leaveConfig.show_message)) return;

    if (serverDB.welcomeConfig.show_image || serverDB.welcomeConfig.DM_image) attachment = await createWelcomeImage(serverDB, member);
    let message = serverDB.welcomeConfig.show_message ? serverDB.welcomeConfig.message : "\u200b", images = attachment ? [attachment] : [];

    message = message.replace(/user/g, member.user.username);
    message = message.replace(/guild/g, member.guild.name);
    message = message.replace(/mention/g, member.user.toString());
    message = message.replace(/members/g, member.guild.memberCount);

    if (serverDB.welcomeConfig.embed) channel.send({ files: images, embeds: [{ color: serverDB.welcomeConfig.embed_color, image: serverDB.welcomeConfig.embed_image, description: message }] });
    else if (serverDB.welcomeConfig.show_message) channel.send({ files: images, content: message });

    if (serverDB.welcomeConfig.DM) {
        message = serverDB.welcomeConfig.DM_Message;
        message = message.replace(/user/g, member.user.username);
        message = message.replace(/guild/g, member.guild.name);
        message = message.replace(/mention/g, member.user.toString());
        message = message.replace(/members/g, member.guild.memberCount);

        member.user.send({ files: images, embeds: [{ color: serverDB.welcomeConfig.embed_color, image: serverDB.welcomeConfig.embed_image, description: message }] });
    }
}