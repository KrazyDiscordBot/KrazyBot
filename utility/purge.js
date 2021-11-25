const { TextChannel, Channel, GuildChannel } = require("discord.js");

class purge {
    /**
     * The module to purge messages in a channel in advanced ways
     * @param {Object} options The options of Purge Class
     * @param {Boolean} options.handle whether you want me to auto handle everything i.e. auto replying on errors etc
     * @param {Number} options.autoDelete  Time after which auto delete message
     */
    constructor({ handle, autoDelete }) {
        this.handle = handle || true;
        this.autoDelete = !isNaN(autoDelete) ? autoDelete : 3000;
    }

    /**
     * An module to purge normal messages of a channel ( upto 1000 )
     * @param {GuildChannel} channel The channel where you want to purge messages
     * @param {Number} number 
     */
    async purgeMessages(channel, number) {
        return new Promise((res, rej) => {
            try {
                if (!channel || !channel.type || (channel.type !== "GUILD_TEXT" && channel.type !== "GUILD_PUBLIC_THREAD" && channel.type !== "GUILD_NEWS" && channel.type !== "GUILD_NEWS_THREAD" && channel.type !== "GUILD_PRIVATE_THREAD")) rej({ type: "error", message: "Invalid channel was provided", id: 0 });
                number = parseInt(number);

                if (!number);
            } catch (e) {
                rej(e);
            }
        })
    }
}

module.exports = purge;