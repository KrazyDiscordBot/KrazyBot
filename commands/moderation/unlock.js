// dependecnies
const Discord = require('discord.js');

// Exporting Module
module.exports = {
  name: "unlock",
  category: "moderation",
  description: "unlock a Server Channel",
  args: "<mention a channel | Channel ID | Channel Name> [reason]",
  options: [
    { name: "channel", required: false, type: 7, description: "The channel whom you want to unlock" },
    { name: "reason", required: false, type: 3, description: "Reason for unlocking the channel" }
  ],
  timeout: 5000,
  allow: 'mod',
  permissions: ['MANAGE_CHANNELS'],
  /**
   * @param {Discord.Client} bot
   * @param {Discord.Message} message
   * @param {Array} args
   */
  run: async (bot, message, args) => {
    message.channel.hello = true;

    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((u) => (u.name.toLowerCase() == args.join(" ").toLowerCase())) || message.channel;
    let reason = `By ${message.author.username} for` + channel === message.channel.hello ? args.join(" ") : args.slice(1).join(" ") || `No reason`;

    if (!channel) return message.channel.send({ embeds: [{ title: "User not found", description: "Please mention an user or give their id to unlock them", color: 'RED' }] });
    if (!channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id).deny.has("SEND_MESSAGES")) return message.reply({ embeds: [{ title: "NOPE", description: "This channel is not locked", color: 'RED' }] });
    if (!channel.manageable) return message.reply({ embeds: [{ title: "NOPE", description: "I can't unlock this channel", color: 'RED' }] });

    channel.permissionOverwrites.create(message.guild.roles.everyone, { SEND_MESSAGES: false }, { reason: `by ${message.author.username} for ${reason}` }).then((m) => {
      message.channel.send({ embeds: [{ color: "GREEN", title: "Channel unlocked Successfully ✅" }] })
    }).catch((e) => {
      message.channel.send({ embeds: [{ color: "RED", title: "I was unable to unlock the channel ❌" }] });
    })
  }
}