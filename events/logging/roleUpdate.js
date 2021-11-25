const Discord = require('discord.js');
const servermodel = require("../../models/server");

module.exports = (oldRole, newRole) => {
    let data = await servermodel.findOne({ Guildid: oldrole.guild.id });

    if (data.logChannels.modlog != 0 && data.logChannels.modlog != "" && data.logChannels.modlog != undefined) {
        if (oldRole.name != newRole.name) {
            let e = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription("Role name Changed")
                .addField("From", oldRole.name, true)
                .addField("\u200b", "\u200b", true)
                .addField("To", newRole.name, true)
                .setFooter("Changed at")
                .setTimestamp()
                .setThumbnail(oldRole.guild.iconURL({ dynamic: true, size: 256 }))
                .setAuthor(
                    newRole.guild.name,
                    oldRole.guild.iconURL({ dynamic: true, size: 256 }),
                    oldRole.guild.iconURL({ dynamic: true, size: 256 })
                );
            oldRole.guild.channels.cache.get(data.logChannels.modlog).send(e).catch(e => { });
        }
        if (oldRole.color != newRole.color) {
            let e = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription("Role Color Changed")
                .addField("From", oldRole.hexColor, true)
                .addField("\u200b", "\u200b", true)
                .addField("To", newRole.hexColor, true)
                .setFooter("Changed at")
                .setTimestamp()
                .setThumbnail(oldRole.guild.iconURL({ dynamic: true, size: 256 }))
                .setAuthor(
                    newRole.guild.name,
                    oldRole.guild.iconURL({ dynamic: true, size: 256 }),
                    oldRole.guild.iconURL({ dynamic: true, size: 256 })
                );
            oldRole.guild.channels.cache.get(data.logChannels.modlog).send(e).catch(e => { });
        }
        if (oldRole.comparePositionTo(newRole) != 0) {
            let a = newRole.guild.roles.cache.size;
            let e = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription("Role Position Changed")
                .addField("From", a - oldRole.position + 1, true)
                .addField("\u200b", "\u200b", true)
                .addField("To", a - newRole.position + 1, true)
                .setFooter("Changed at")
                .setTimestamp()
                .setThumbnail(oldRole.guild.iconURL({ dynamic: true, size: 256 }))
                .setAuthor(
                    newRole.guild.name,
                    oldRole.guild.iconURL({ dynamic: true, size: 256 }),
                    oldRole.guild.iconURL({ dynamic: true, size: 256 })
                );
            oldRole.guild.channels.cache.get(data.logChannels.modlog).send(e).catch(e => { });
        }
        let padd = [];
        newRole.permissions.toArray().forEach(p => {
            if (!oldRole.permissions.has(p)) {
                padd.push(p);
            }
        });
        if (padd.length >= 1) {
            let e = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(
                    "Role Permissions Added\nAdded Permissions : " + padd.join(" ")
                )
                .setFooter("Added at")
                .setTimestamp()
                .setThumbnail(oldRole.guild.iconURL({ dynamic: true, size: 256 }))
                .setAuthor(
                    newRole.guild.name,
                    oldRole.guild.iconURL({ dynamic: true, size: 256 }),
                    oldRole.guild.iconURL({ dynamic: true, size: 256 })
                );
            oldRole.guild.channels.cache.get(data.logChannels.modlog).send(e).catch(e => { });
        }
        let pre = [];
        oldRole.permissions.toArray().forEach(p => {
            if (!newRole.permissions.has(p)) {
                pre.push(p);
            }
        });
        if (pre.length >= 1) {
            let e = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(
                    "Role Permissions Removed\nRemoved Permissions : " + pre.join(" ")
                )
                .setFooter("Added at")
                .setTimestamp()
                .setThumbnail(oldRole.guild.iconURL({ dynamic: true, size: 256 }))
                .setAuthor(
                    newRole.guild.name,
                    oldRole.guild.iconURL({ dynamic: true, size: 256 }),
                    oldRole.guild.iconURL({ dynamic: true, size: 256 })
                );
            oldRole.guild.channels.cache.get(data.logChannels.modlog).send(e).catch(e => { });
        }
    }
}