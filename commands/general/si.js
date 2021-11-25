//require
const discord = require("discord.js");

//export
module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    category: "general",
    description: "Shows the Server info",
    timeout: 5000,
    allow: "all",
    run: async (bot, message) => {
        //code
        let embed = new discord.MessageEmbed()
            .setTitle(`${message.guild.name}`)
            .setColor('RANDOM')
            .setThumbnail(message.guild.iconURL())
            .addField("**Server Name** 📑", message.guild.name, true)
            .addField("**Server ID** 🆔", message.guild.id, true)
            .addField("**Owner** 👑", message.guild.owner, true)
            .addField("**Server Roles** 🎡", message.guild.roles.cache.size, true)
            .addField("**Members** 🤼", `**Total Members:**${message.guild.members.cache.size}\n🟢${message.guild.members.cache.filter(m => m.presence.status === "online").size}‎‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎⛔${message.guild.members.cache.filter(m => m.presence.status === "dnd").size}\n‎‎⚫${message.guild.members.cache.filter(m => m.presence.status === "offline").size}‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎  🌙${message.guild.members.cache.filter(m => m.presence.status === "idle").size}‏‏`, true)
            .addField("**Server Channels** 🕎", `**Total Channel:**${message.guild.channels.cache.size}\n**Text Channel:**${message.guild.channels.cache.filter(c => c.type === 'text').size}\n**Voice Channel:**${message.guild.channels.cache.filter(c => c.type === 'voice').size}`, true)
            .addField("**Total Category** 🎞", message.guild.channels.cache.filter(c => c.type === 'category').size, true)
            .setFooter("Created at:" + message.guild.createdAt)
            .addField("**Verfied Server** 🏁", message.guild.verified, true)
            .addField("**Server Region** 🌐", message.guild.region, true)
            .addField("**Verifications Level** 🎫", message.guild.verificationLevel, true)
            .addField("**Boosts** 🎇", message.guild.premiumSubscriptionCount, true)
            .addField("**Boost Level** 🎆", message.guild.premiumTier, true)
            .addField("**Number of Emoji** 🎭", message.guild.emojis.cache.size, true)
        embed.addField("**Vanity Url** 🏠", message.guild.vanityURLCode || "No vanity Url", true);
        embed.setDescription(message.guild.description || " ");

        message.channel.send(embed);
    }
}