// Exporting Module
module.exports = {
    name: "slowmode",
    aliases: ['sm'],
    category: "moderation",
    description: "Change slowmode of the channel",
    args: "<time in seconds>",
    timeout: 5000,
    options: [
        {
            name: "time",
            type: 4,
            required: true,
            description: "The slowmode time interval in seconds"
        }
    ],
    allow: 'mod',
    permissions: ['MANAGE_MESSAGES'],
    run: async (bot, message, args) => {
        //code
        const time = parseInt(args[0]);

        if (!time || time < 1 || time > 300) return message.reply({ embeds: [{ color: "RED", title: "Time should be a number from 1 to 300" }] });

        message.channel.setRateLimitPerUser(time, `${message.author.username} used a command to do so.`).then(v=>{
            message.reply({ embeds: [{ color: "GREEN", title: `Slowmode changes to ${time} second(s)` }] });
        }).catch(e=>{
            message.reply({ embeds: [{ color: "RED", title: "There was a issue in changing the slowmode for this channel. Maybe i do not have `ManageChannels` permission" }] });
        })
    }
}