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
            .addField("**Server Name** š", message.guild.name, true)
            .addField("**Server ID** š", message.guild.id, true)
            .addField("**Owner** š", message.guild.owner, true)
            .addField("**Server Roles** š”", message.guild.roles.cache.size, true)
            .addField("**Members** š¤¼", `**Total Members:**${message.guild.members.cache.size}\nš¢${message.guild.members.cache.filter(m => m.presence.status === "online").size}āāāāāāā āāāā āāāā āāāā āāāā āāāā āā${message.guild.members.cache.filter(m => m.presence.status === "dnd").size}\nāāā«${message.guild.members.cache.filter(m => m.presence.status === "offline").size}ā āāāā āāāā āāāā  š${message.guild.members.cache.filter(m => m.presence.status === "idle").size}āā`, true)
            .addField("**Server Channels** š", `**Total Channel:**${message.guild.channels.cache.size}\n**Text Channel:**${message.guild.channels.cache.filter(c => c.type === 'text').size}\n**Voice Channel:**${message.guild.channels.cache.filter(c => c.type === 'voice').size}`, true)
            .addField("**Total Category** š", message.guild.channels.cache.filter(c => c.type === 'category').size, true)
            .setFooter("Created at:" + message.guild.createdAt)
            .addField("**Verfied Server** š", message.guild.verified, true)
            .addField("**Server Region** š", message.guild.region, true)
            .addField("**Verifications Level** š«", message.guild.verificationLevel, true)
            .addField("**Boosts** š", message.guild.premiumSubscriptionCount, true)
            .addField("**Boost Level** š", message.guild.premiumTier, true)
            .addField("**Number of Emoji** š­", message.guild.emojis.cache.size, true)
        embed.addField("**Vanity Url** š ", message.guild.vanityURLCode || "No vanity Url", true);
        embed.setDescription(message.guild.description || " ");

        message.channel.send(embed);
    }
}