//require stuff
const Discord = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "userinfo",
    category: "general",
    aliases: ["ui", "whois"],
    description: "Get information of any Server User",
    args: "[user]",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "The User"
    }],
    timeout: 5000,
    allow: "all",
    run: async (bot, message, args) => {
        //code
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((u) => u.user.username == args.join(" ")) || message.member;
        let a = user.roles.cache.array();

        let roles = "No Roles";
        if (a.length) {
            roles = "";
            for (let i = 0; i < a.length; i++) {
                if (i <= 8) {
                    roles += a[i].toString();
                } else {
                    break;
                }
            }
        }

        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };
        let perms = []
        if (user.permissions.has("ADMINISTRATOR")) {
            perms.push("ADMINISTRATOR")
        } else {
            if (user.permissions.has("MANAGE_CHANNELS")) {
                perms.push("MANAGE_CHANNELS")
            } if (user.permissions.has("KICK_MEMBERS")) {
                perms.push("KICK_MEMBERS")
            } if (user.permissions.has("BAN_MEMBERS")) {
                perms.push("BAN_MEMBERS")
            } if (user.permissions.has("MANAGE_MESSAGES")) {
                perms.push("MANAGE_MESSAGES")
            } if (user.permissions.has("MANAGE_ROLES")) {
                perms.push("MANAGE_ROLES")
            } if (user.permissions.has("MANAGE_GUILD")) {
                perms.push("MANAGE_GUILD")
            } if (user.permissions.has("VIEW_AUDIT_LOG")) {
                perms.push("VIEW_AUDIT_LOG")
            } if (user.permissions.has("VIEW_GUILD_INSIGHTS")) {
                perms.push("VIEW_GUILD_INSIGHTS")
            } if (user.permissions.has("MANAGE_NICKNAMES")) {
                perms.push("MANAGE_NICKNAMES")
            } if (user.permissions.has("MANAGE_WEBHOOKS")) {
                perms.push("MANAGE_WEBHOOKS")
            } if (user.permissions.has("MANAGE_EMOJIS")) {
                perms.push("MANAGE_EMOJIS")
            }
        }
        if (perms.length == 0) {
            perms.push("No key Permissions")
            const userFlags = user.user.flags.toArray();
        }

        let x = Date.now() - user.user.createdAt;
        let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt;
        const joined = Math.floor(y / 86400000);
        const joineddate = `${moment(user.user.joinedTimestamp).format('LT')} ${moment(user.user.joinedTimestamp).format('LL')}`;
        let embed = new Discord.MessageEmbed().setColor("BLUE")
            .setAuthor(user.user.username, user.user.displayAvatarURL(), user.user.displayAvatarURL())
            .setTitle(`${user.user.username}` + "\'s Info")
            .addField("Username 📛", user.user.username, true)
            .addField("User ID 🆔", user.id, true)
            .addField("Nickname 🧾", user.nickname ? user.nickname : "No Nickname", true)
            .addField("**Joined At** ➕", joineddate, true)
            .addField("**Server Age** 📊", joined + " days", true)
            .addField("**Hoist Role** 🌟", `${user.roles.hoist ? user.roles.hoist.name : 'None'}`, true)
            .addField("**Created At** 👶", `${moment(user.user.createdTimestamp).format('LT')} ${moment(user.user.createdTimestamp).format('LL')}`, true)
            .addField("**Account Age** 🧓", `${moment(user.user.createdTimestamp).fromNow()}`, true)
            .addField("**Highest Role** 📈", `${user.roles.highest.id === message.guild.id ? 'None' : user.roles.highest.name}`, true)
            .addField("**Number of Roles** 🔢", `${a.length}`, true)
            .addField("**Flag(s)** 🏁", ` ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`, true)
            .addField("**Status** 💼", ` ${user.user.presence.status == "online" ? "Online <:online5:729686079237783644>" : user.user.presence.status == "dnd" ? "Do not Disturb <:dnd5:729685623023206410>" : user.user.presence.status == "offline" ? "Offline <:offline5:729686477625360414>" : "Idle <:idle5:729686255763324958>"}`, true)
            .addField("Key Permissions 🔑", perms == null ? "No Key permissions" : perms.join(" , "), true)
            .addField("Roles [" + a.length + "] <:roles5:730045942056878161>", roles.slice(0, roles.length > 5 ? 5 : roles.length), true)
            .setFooter("Viewed By " + message.author.username + " at", message.author.displayAvatarURL())
            .setTimestamp()
            .setThumbnail(user.user.displayAvatarURL())
        message.channel.send(embed)
    }
}