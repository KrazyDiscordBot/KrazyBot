const Discord = require("discord.js");

/**
 * An module to get the muted role of the server
 * @param {Discord.Guild} guild
 * @returns {Promise<Discord.Role>}
 */
module.exports = (guild) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = guild.roles.cache.find((r) => r.name === "muted");

            if (!role) {
                const newRole = await guild.roles.create({ hoist: false, reason: "For auto moderation", name: "muted", mentionable: false, color: "GREY" });

                const channels = guild.channels.cache.filter(c => c.type === "GUILD_TEXT");
                const channels2 = guild.channels.cache.filter(c => c.type === "GUILD_VOICE");

                channels.forEach(async (ch) => {
                    await ch.permissionOverwrites.create(role, { SEND_MESSAGES: false })
                })
                channels2.forEach(async (ch) => {
                    await ch.permissionOverwrites.create(role, { SPEAK: false })
                });

                resolve(newRole);
            } else {
                resolve(role);
            }
        } catch (e) {
            reject(e);
        }
    })
}