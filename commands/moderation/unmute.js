// dependecnies
const Discord = require('discord.js');
const getunmutedRole = require('../../utility/getMutedRole');

// Exporting Module

module.exports = {
  name: "unmute",
  category: "moderation",
  description: "unmute a Server Member",
  args: "<mention a user | User ID | Username> [reason]",
  options: [
    { name: "user", required: true, type: 6, description: "The user whom you want to unmute" },
    { name: "reason", required: false, type: 3, description: "Reason for unmuting the user" }
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
    let role = await getunmutedRole(message.guild);

    if (!user) return message.channel.send({ embeds: [{ title: "User not found", description: "Please mention an user or give their id to unmute them", color: 'RED' }] });
    if (!user.roles.cache.has(role.id)) return message.channel.send({ embeds: [{ title: "User is not muted", color: 'RED' }] });

    if (message.guild.me.roles.highest.position <= role.position) return message.reply({ embeds: [{ title: "WOOPS", description: "My highest role is below the muted role so I can't unmuted this user", color: 'RED' }] });

    user.roles.remove(role, `Role removed by ${message.author.username} for ${args.slice(1).join(" ")}` || "NO reason provided by " + message.author.username).then((m) => {
      message.channel.send({ embeds: [{ color: "GREEN", title: "User unmuted Successfully ✅" }] })
      m.user.send({ embeds: [{ color: "DARK_RED", title: "You are unmuted! GG", fields: [{ name: "Server", value: message.guild.name, inline: true }, { name: "Moderator", value: message.author.username, inline: true }, { name: "Reason", value: args.slice(1).join(" ") || "No reason", inline: true }] }] }).catch((e) => { });
    }).catch((e) => {
      message.channel.send({ embeds: [{ color: "RED", title: "I was unable to unmute the user ❌" }] });
    })
  }
}