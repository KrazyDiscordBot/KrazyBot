//require stuff
const Discord = require("discord.js");

//export
module.exports = {
    name: "flip",
    category: "game",
    allow: "all",
    description: "flips the coin",
    options: [{
        name: "choice",
        description: "your guess on coin's flip",
        type: 3,
        required: true,
        choices: [{
            name: "heads",
            value: "heads",
        }, {
            name: "tails",
            value: "tails",
        }]
    }],
    args:"<choice>",
    timeout: 3000,
    run: async (bot, message, args) => {
        //code
        if (args[0].toLowerCase() !== "tails" && args[0].toLowerCase() !== "heads") return message.channel.send({ embeds: [{ color: "RED", title: "⛔ You choosed wrong thing keed, you have two options `Heads` or `Tails`" }] });

        const choice = Math.floor(Math.random() * 2) === 1 ? "heads" : "tails";

        message.reply({ embeds: [{ color: "BLUE", title: "Flipping the coin", image: `http://no-api-key.com/image/quarter/${choice}.gif` }] })
            .then((msg) => {
                setTimeout(function () {
                    msg.edit(`So the Result isss ${choice}\n\n${choice === args[0].toLowerCase() ? "GG You guessed it right" : "RIP you lost nerd!!!"}`)
                }, 1000);
            });
    }
}