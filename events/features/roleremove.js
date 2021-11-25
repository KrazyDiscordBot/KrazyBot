const Discord = require("discord.js");
const { serverModel } = require("../../models");
const { guildData } = require("../../utility");

/**
 * 
 * @param {Discord.MessageReaction} reaction 
 * @param {Discord.User} user 
 * @param {guildData} serverDB 
 */
module.exports = (reaction, user, serverDB) => {
    serverDB = await serverModel.findOne({ id: reaction.message.guildId });
    let member = reaction.message.guild.members.cache.get(user.id);

    serverDB.autoRole.reactionRole.forEach(v => {
        if (reaction.message.id !== v.message) return;
        if (!v.roles.some(vv => vv.emoji === reaction.emoji.name || vv.emoji === reaction.emoji.id)) return;

        let db = v.roles.filter(vv => vv.emoji === reaction.emoji.name || vv.emoji === reaction.emoji.id)[0];
        let say = db.reply, role = reaction.message.guild.roles.cache.get(db.role);

        if(!role)return user.send({ embeds: [{ color: "RED", title:`This role is deleted, please ask the server admin to fix the reaction role` , fields: [{ name: "From Server", value: reaction.message.guild.name, inline: true }] }] });
        if(!member.roles.cache.has(role.id))return;
       
        member.roles.remove(role);
        user.send({ embeds: [{ color: "GREEN", description: say, fields: [{ name: "From Server", value: reaction.message.guild.name, inline: true }] }] });
    })
}