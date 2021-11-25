module.exports = {
  name: "gsnipe",
  allow: "all",
  description: "Get a Delete Message of your choice in the channel",
  args: "[snipe]",
  options: [{
    name: "snipe",
    description: "the number of snipe which you want",
    type: 4,
    required: false
  }],
  category: "fun",
  timeout: 5000,
  run: async (bot, message, args) => {
    const snipes = bot.gsnipe.get(message.channel.id) || [];

    if (snipes == null || snipes.length == 0) return message.reply({ embeds: [{ color: "RED", title: "NO G-Snipes Spotted" }] });
    const msg = snipes[parseInt(args[0]) - 1 || 0];
    if (!msg) return message.reply({ embeds: [{ color: "RED", title: "⛔ That is not a valid g-snipe number use this command like `k!gsnipe 1` or any other number till" + snipes.length }] });

    msg.author = message.guild.members.cache.get(msg.user).user;

    message.channel.send({ embeds: [{ color: "RANDOM", description: `${msg.content}`, footer: `Date: ${msg.date} | ${args[0] || 1}/${snipes.length}`, author: { name: msg.author.tag, iconURL: msg.author.displayAvatarURL({ dynamic: true, size: 256 }) } }] });
  },
};