// dependecnies
const Discord = require('discord.js');

// Exporting Module
module.exports = {
  name: "lock",
  category: "moderation",
  description: "lock a Server Channel",
  args: "<mention a channel | Channel ID | Channel Name> [reason]",
  options: [
    { name: "channel", required: false, type: 7, description: "The channel whom you want to lock" },
    { name: "reason", required: false, type: 3, description: "Reason for locking the channel" }
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

    if (!channel) return message.channel.send({ embeds: [{ title: "Channel not found", description: "Please mention an channel or give its id to lock it", color: 'RED' }] });
    if (channel.permissionOverwrites.cache.get(message.guild.roles.everyone.id).deny.has("SEND_MESSAGES")) return message.reply({ embeds: [{ title: "NOPE", description: "This channel is alread locked", color: 'RED' }] });
    if (!channel.manageable) return message.reply({ embeds: [{ title: "NOPE", description: "I can't lock this channel", color: 'RED' }] });

    channel.permissionOverwrites.create(message.guild.roles.everyone, { SEND_MESSAGES: false }, { reason: `by ${message.author.username} for ${reason}` }).then((m) => {
      message.channel.send({ embeds: [{ color: "GREEN", title: "Channel locked Successfully ✅" }] })
    }).catch((e) => {
      message.channel.send({ embeds: [{ color: "RED", title: "I was unable to lock the channel ❌" }] });
    })
  }
}