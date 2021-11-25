const { Message } = require("discord.js");

module.exports = {
  name: "snipe",
  allow: "all",
  description: "Get a Delete Message of your choice in the channel",
  options: [{
    name: "snipe",
    description: "the number of snipe which you want",
    type: 4,
    required: false
  }],
  args: "[the number of snipe]",
  category: "fun",
  timeout: 5000,
  /**
   * 
   * @param {*} bot 
   * @param {Message} message 
   * @param {*} args 
   * @returns 
   */
  run: async (bot, message, args) => {
    const snipes = bot.snipe.get(message.channel.id) || [];

    if (snipes == null || snipes.length == 0) return message.reply({ embeds: [{ color: "RED", title: "NO Snipes Spotted" }] });
    const msg = snipes[parseInt(args[0]) - 1 || 0];
    if (!msg) return message.reply({ embeds: [{ color: "RED", title: "⛔ That is not a valid snipe number use this command like `k!snipe 1` or any other number till" + snipes.length }] });

    msg.author = message.guild.members.cache.get(msg.user).user;

    message.channel.send({ embeds: [{ color: "RANDOM", description: `${msg.content}`, footer: `Date: ${msg.date} | ${args[0] || 1}/${snipes.length}`,author:{name:msg.author.tag,iconURL:msg.author.displayAvatarURL({ dynamic: true, size: 256 })} }] });
  },
};