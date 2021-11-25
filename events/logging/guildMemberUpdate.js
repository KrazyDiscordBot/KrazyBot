const servermodel = require("../../models/server");
const Discord = require('discord.js');
/**
 * 
 * @param {Discord.GuildMember} oldMember 
 * @param {Discord.GuildMember} newMember 
 * @returns 
 */

module.exports = (oldMember, newMember) => {
    let data = await servermodel.findOne({ Guildid: newMember.guild.id });

    if (oldMember.premiumSinceTimestamp !== null && newMember.premiumSinceTimestamp === null) {
        let e = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTimestamp(oldMember.user.username+"'s boost expired'")
            .setFooter("Boosted Expired at")
            .setTimestamp()
            .setAuthor(
                newMember.user.username,
                newMember.user.displayAvatarURL({ dynamic: true, size: 256 }),
                newMember.user.displayAvatarURL({ dynamic: true, size: 256 })
            )
            .setThumbnail(
                newMember.user.displayAvatarURL({ dynamic: true, size: 256 })
            );
        newMember.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e => { });
    }

    if (data.logChannels.generallog) {
        let addedRole = null;

        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) {
                addedRole = role;
            }
        });

        if (addedRole) {
            let e = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription("New Role Added to " + oldMember.user.username)
                .addField("Role", `<@&${addedRole.id}>`)
                .setFooter("Added at")
                .setTimestamp()
                .setAuthor(
                    newMember.user.username,
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 }),
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 })
                )
                .setThumbnail(
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 })
                );
            newMember.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e => { });
        }

        let removedRole = null;
        oldMember.roles.cache.forEach(role => {
            if (!newMember.roles.cache.has(role.id)) {
                removedRole = role;
            }
        });

        if (removedRole) {
            let e = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription("Role Removed from" + oldMember.user.username)
                .addField("Role", `<@&${removedRole.id}>`)
                .setFooter("Removed at")
                .setTimestamp()
                .setAuthor(
                    newMember.user.username,
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 }),
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 })
                )
                .setThumbnail(
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 })
                );
            newMember.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e => { });
        }

        if (oldMember.nickname !== newMember.nickname) {
            let e = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription("Nickname changed of " + oldMember.user.username)
                .addField(
                    "Old Nickname",
                    `${oldMember.nickname == null
                        ? oldMember.user.username
                        : oldMember.nickname
                    }`,
                    true
                )
                .addField("\u200b", `\u200b`, true)
                .addField(
                    "New Nickname",
                    `${newMember.nickname == null
                        ? newMember.user.username
                        : newMember.nickname
                    }`,
                    true
                )
                .setFooter("Changed at")
                .setTimestamp()
                .setAuthor(
                    newMember.user.username,
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 }),
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 })
                )
                .setThumbnail(
                    newMember.user.displayAvatarURL({ dynamic: true, size: 256 })
                );
            newMember.guild.channels.cache.get(data.logChannels.generallog).send(e).catch(e => { });
        }
    }
}