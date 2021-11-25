// dependecnies
const Discord = require('discord.js')
const Purger = require('../../../../packages/discord-purger/src')
const purger = new Purger()

// Exporting Module
module.exports = {
    name: "purge",
    category: "moderation",
    description: "purge an User",
    args: "<Messages | Bots | User | includes> <number of messages> [ user | thing to check in message]",
    timeout: 8000,
    options: [
        { name: "messages", description: "Purge all messages of this channel", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }] },
        { name: "bot-messages", description: "Purge All bot messages in this channel", type: 1 },
        { name: "link-messages", description: "Purge all messages which contains link", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }] },
        { name: "emoji-messages", description: "Purge all messages which contains emojis", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }] },
        { name: "attachment-messages", description: "Purge all messages which contains attachments", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }] },
        { name: "user-messages", description: "Purge all messages of a user", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }, { name: "user", type: 6, description: "The user who's messages you want to purge", required: true }] },
        { name: "messages-equal", description: "Purge all messages which are equal to something", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }, { name: "string", type: 3, description: "The thing to which message should be equal to", required: true }] },
        { name: "messages-includes", description: "Purge all messages which conatins something in them", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }, { name: "string", type: 3, description: "The thing which message should conatins", required: true }] },
        { name: "messages-starts", description: "Purge all messages which starts with something", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }, { name: "string", type: 3, description: "The thing with which message should start", required: true }] },
        { name: "messages-ends", description: "Purge all messages which ends with something", type: 1, options: [{ name: "number", type: 4, description: "Number of messages to purge", required: true }, { name: "string", type: 3, description: "The thing with which message should end", required: true }] },
    ],
    allow: 'mod',
    permissions: ['MANAGE_MESSAGES'],
    /**
     * @param {Discord.Client} bot
     * @param {Discord.Message} message
     * @param {Array} args
     */
    run: async (bot, message, args, a1, b1, c1, interaction) => {
        //code
        if (interaction?.options) {
            let messages = parseInt(args[0]) > 100 ? 100 : parseInt(args[0]) < 1 ? 1 : parseInt(args[0]);
            let user = message.guild.members.cache.get(args[1])?.user || message.guild.members.cache.find(v => v.user.username === args[1])?.user || message.mentions.members.first()?.user;
            let string = args.slice(1).join(" ");
            purger.purge(interaction.options._subcommand, message, message.channel, messages, user ? user : string).then(v => console.log(v)).catch(e => console.log(e))
        } else {
            let messages = parseInt(args[1]) > 100 ? 100 : parseInt(args[1]) < 1 ? 1 : parseInt(args[1]) + 1;
            let user = message.guild.members.cache.get(args[2])?.user || message.guild.members.cache.find(v => v.user.username === args[2])?.user || message.mentions.members.first()?.user;
            let string = args.slice(2).join(" ");

            if (isNaN(messages)) return message.reply({ embeds: [{ color: "RED", title: "Invalid Number of messages were provided ❌", description: "Please provide number of messages from 1 to 100 only" }] });

            if (option_ === "messages") purger.purgeMessages(message, message.channel, messages);
            if (option_ === "bot-messages") purger.purgeBotMessages(message, message.channel);
            if (option_ === "link-messages") purger.purgeMessagesWithLinks(message, message.channel, messages);
            if (option_ === "emoji-messages") purger.purgeMessagesWithEmojis(message, message.channel, messages);
            if (option_ === "attachment-messages") purger.purgeMessagesWithAttachments(message, message.channel, messages);
            if (option_ === "user-messages") purger.purgeUserMessages(message, message.channel, messages, user);
            if (option_ === "messages-equal") purger.purgeMessagesEqual(message, message.channel, messages, string);
            if (option_ === "messages-includes") purger.purgeMessagesEqual(message, message.channel, messages, string);
            if (option_ === "messages-ends") purger.purgeMessagesEqual(message, message.channel, messages, string);
            if (option_ === "messages-starts") purger.purgeMessagesEqual(message, message.channel, messages, string);
        }
    }
}