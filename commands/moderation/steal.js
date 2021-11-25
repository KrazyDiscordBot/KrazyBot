// dependecnies
const { default: axios } = require('axios');
const Discord = require('discord.js');

// Exporting Module
module.exports = {
    name: "steal",
    aliases: ["emoji"],
    category: "moderation",
    description: "Steal some server's emoji or download one from a link.",
    args: "<emoji or emoji link> [emoji name]",
    options: [
        { name: "emoji-or-link", required: true, type: 3, description: "The emoji which you wanna steal or the emoji link." },
        { name: "emoji-name", required: false, type: 3, description: "The emoji name." },
    ],
    timeout: 5000,
    allow: 'mod',
    permissions: ['MANAGE_EMOJIS_AND_STICKERS'],
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {Array} args
     */
    run: async (bot, message, args) => {
        let emoji = args[0], name = args[1] || `emoji_${message.guild.emojis.cache.size + 1}`, base = "https://cdn.discordapp.com/emojis/";

        if (/<a?:[a-z|0-9|_]+:/i.exec(emoji)?.length > 0) emoji = `${base}${emoji.substring(/<a?:[a-z|0-9|_]+:/i.exec(emoji)[0]?.length, emoji?.length - 1)}${emoji.startsWith("<a:") ? ".gif" : ".png"}?v=1`;

        await axios.get(emoji).then(() => {
            message.guild.emojis.create(emoji, name, { reason: `${message.author.username} used steal emoji command.` }).then(v => {
                message.reply({ embeds: [{ color: "GREEN", title: "Successfully added the emoji.", description: `now you can use ${v.toString()} emoji.` }] })
            }).catch(e => {
                let size = {
                    NONE: 50, TIER_1: 100, TIER_2: 150, TIER_3: 250
                }

                if (message.guild.emojis.cache.filter(v => v.animated).size === size[message.guild.premiumTier] || message.guild.emojis.cache.filter(v => !v.animated).size === size[message.guild.premiumTier]) return message.reply({ embeds: [{ color: "RED", title: "This server do not have empty slots for emoji" }] })
                message.reply({ embeds: [{ color: "RED", title: "Invalid Image link was provided" }] })
            })
        }).catch(async () => {
            if (!emoji.endsWith(".gif?v=1")) return message.reply({ embeds: [{ color: "RED", title: "Invalid Image Link was provided" }] });
        });
    }
}