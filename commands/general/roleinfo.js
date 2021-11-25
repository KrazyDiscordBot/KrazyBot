//require stuff
const Discord = require("discord.js");
//export
module.exports = {
    name: "roleinfo",
    allow: "all",
    aliases: ["ri"],
    category: "general",
    description: "Shows the role info",
    args: "<role>",
    options: [{
        name: "role",
        type: 8,
        required: true,
        description: "The role"
    }],
    timeout: 8000,
    run: async (bot, message, args, touse) => {
        //code
        if (!args[0]) {
            message.channel.send('you are supposed to give role name too');
        }
        else {
            try {
                let tr = parseInt(message.guild.roles.cache.size);
                let role = message.guild.roles.cache.find(r => r.name === args.join(" ")) || message.guild.roles.cache.get(args[0]) || message.mentions.roles.first();

                if (!role) return message.reply("Role not found");
                let perms = []
                if (role.permissions.has("ADMINISTRATOR")) {
                    perms.push("ADMINISTRATOR")
                } else {
                    if (role.permissions.has("MANAGE_CHANNELS")) {
                        perms.push("MANAGE_CHANNELS")
                    } if (role.permissions.has("KICK_MEMBERS")) {
                        perms.push("KICK_MEMBERS")
                    } if (role.permissions.has("BAN_MEMBERS")) {
                        perms.push("BAN_MEMBERS")
                    } if (role.permissions.has("MANAGE_MESSAGES")) {
                        perms.push("MANAGE_MESSAGES")
                    } if (role.permissions.has("MANAGE_ROLES")) {
                        perms.push("MANAGE_ROLES")
                    } if (role.permissions.has("MANAGE_GUILD")) {
                        perms.push("MANAGE_GUILD")
                    } if (role.permissions.has("VIEW_AUDIT_LOG")) {
                        perms.push("VIEW_AUDIT_LOG")
                    } if (role.permissions.has("VIEW_GUILD_INSIGHTS")) {
                        perms.push("VIEW_GUILD_INSIGHTS")
                    } if (role.permissions.has("MANAGE_NICKNAMES")) {
                        perms.push("MANAGE_NICKNAMES")
                    } if (role.permissions.has("MANAGE_WEBHOOKS")) {
                        perms.push("MANAGE_WEBHOOKS")
                    } if (role.permissions.has("MANAGE_EMOJIS")) {
                        perms.push("MANAGE_EMOJIS")
                    }
                }
                if (perms.length == 0) {
                    perms.push("No key Permissions")
                }

                let membersWithRole = message.guild.roles.cache.get(role.id).members.map(m => m.user.tag);
                let EMBED = new Discord.MessageEmbed()
                    .setTitle(role.name + '\'s Info')
                    .setColor('RANDOM')
                    .setFooter(`CREATED AT:${role.createdAt}`)
                    .addField("**Name**", `${role.name}`, true)
                    .addField("**ID**", `${role.id}`, true)
                    .addField("**Color**", `${role.hexColor}`, true)
                    .addField("**Hoist**", `${role.hoist}`, true)
                    .addField("**Mentionable**", `${role.mentionable}`, true)
                    .addField("Key Permissions", perms == [] ? "No Key permissions" : perms.join(" , "), true)
                    .setDescription(`Number of user(s) having this role\n${membersWithRole.length}`)

                message.channel.send(EMBED);
            }
            catch (error) {
                console.log(error)
                message.channel.send("Hey that is not an valid role");
            }
        }
    }
}