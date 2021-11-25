const Discord = require('discord.js');
const servermodel = require("../../models/server");

module.exports = (role) => {
    let data = await servermodel.findOne({ Guildid: role.guild.id });

    bot.roleStats(role.guild,data)

    let perms = ["No Key permissions"];
    if (role.permissions.has("ADMINISTRATOR")) {
        perms.push("ADMINISTRATOR");
    }
    if (role.permissions.has("MANAGE_CHANNELS")) {
        perms.push("MANAGE_CHANNELS");
    }
    if (role.permissions.has("KICK_MEMBERS")) {
        perms.push("KICK_MEMBERS");
    }
    if (role.permissions.has("BAN_MEMBERS")) {
        perms.push("BAN_MEMBERS");
    }
    if (role.permissions.has("MANAGE_MESSAGES")) {
        perms.push("MANAGE_MESSAGES");
    }
    if (role.permissions.has("MANAGE_ROLES")) {
        perms.push("MANAGE_ROLES");
    }
    if (role.permissions.has("MANAGE_GUILD")) {
        perms.push("MANAGE_GUILD");
    }
    if (role.permissions.has("VIEW_AUDIT_LOG")) {
        perms.push("VIEW_AUDIT_LOG");
    }
    if (role.permissions.has("VIEW_GUILD_INSIGHTS")) {
        perms.push("VIEW_GUILD_INSIGHTS");
    }
    if (role.permissions.has("MANAGE_NICKNAMES")) {
        perms.push("MANAGE_NICKNAMES");
    }
    if (role.permissions.has("MANAGE_WEBHOOKS")) {
        perms.push("MANAGE_WEBHOOKS");
    }
    if (role.permissions.has("MANAGE_EMOJIS")) {
        perms.push("MANAGE_EMOJIS");
    }
    let e = new Discord.MessageEmbed()
        .setColor(role.hexColor)
        .setDescription("New Role created " + `${role.name}`)
        .addField("Color", role.hexColor, true)
        .addField("Hoist", role.hoist, true)
        .addField("ID", role.id, true)
        .addField("Mentionable", role.mentionable, true)
        .addField("Position", role.guild.roles.cache.size - role.position, true)
        .addField("Key Permissions", perms.join(" , "), true)
        .setThumbnail(role.guild.iconURL({ dynamic: true }))
        .setAuthor(
            role.guild.name,
            role.guild.iconURL({ dynamic: true }),
            role.guild.iconURL({ dynamic: true })
        )
        .setFooter("Created At")
        .setTimestamp();
    role.guild.channels.cache.get(data.logChannels.modlog).send(e).catch(e => { });
}