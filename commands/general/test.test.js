const canvacord = require('../../../../snowflake/canvacord/dist/dist');

console.log(canvacord);

module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    category: "general",
    description: "Shows the Server info",
    timeout: 5000,
    allow: "all",
    run: async (bot, message) => {
        message.reply("test gg!")
    }
}