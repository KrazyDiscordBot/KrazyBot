// dependecnies
const Discord = require('discord.js');
const getMutedRole = require('../../utility/getMutedRole');

// Exporting Module

module.exports = {
  name: "mute",
  category: "moderation",
  description: "mute a Server Member",
  args: "<mention a user | User ID | Username> [reason]",
  options: [
    { name: "user", required: true, type: 6, description: "The user whom you want to mute" },
    { name: "reason", required: false, type: 3, description: "Reason for muting the user" }
  ],
  timeout: 5000,
  allow: 'mod',
  permissions: ['MANAGE_ROLES'],
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message} message
   * @param {Array} args
   */
  run: async (bot, message, args, serverDB) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((u) => (u.user.username.toLowerCase() == args.join(" ").toLowerCase() || u.nickname.toLowerCase() == args.join(" ").toLowerCase()));
    let role = await getMutedRole(message.guild);

    if (!user) return message.channel.send({ embeds: [{ title: "User not found", description: "Please mention an user or give their id to mute them", color: 'RED' }] });
    if (user.roles.cache.has(role.id)) return message.channel.send({ embeds: [{ title: "User is already muted", color: 'RED' }] });

    if (message.guild.me.roles.highest.position <= role.position) return message.reply({ embeds: [{ title: "WOOPS", description: "My highest role is below the Muted role so I can't muted this user", color: 'RED' }] });
    if (client.getPower(serverDB, user) > 0) return message.reply({ embeds: [{ title: "NOPE", description: "I can't mute this user, Because this user is a Moderator/Admin", color: 'RED' }] });

    user.roles.add(role, `Role added by ${message.author.username} for ${args.slice(1).join(" ")}` || "NO reason provided by " + message.author.username).then((m) => {
      message.channel.send({ embeds: [{ color: "GREEN", title: "User muted Successfully ✅" }] })
      m.user.send({ embeds: [{ color: "DARK_RED", title: "You are muted! RIP", fields: [{ name: "Server", value: message.guild.name, inline: true }, { name: "Moderator", value: message.author.username, inline: true }, { name: "Reason", value: args.slice(1).join(" ") || "No reason", inline: true }] }] }).catch((e) => { });
    }).catch((e) => {
      message.channel.send({ embeds: [{ color: "RED", title: "I was unable to mute the user ❌" }] });
    })
  }
}