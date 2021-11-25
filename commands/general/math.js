// Required
const math = require('mathjs');
const Discord = require("discord.js");

// Exports
module.exports = {
    name: "math",
    category: "general",
    description: "I will do some math for you for you",
    args: "<query>",
    options: [{
        name: "query",
        type: 3,
        required: true,
        description: "Your maths equation"
    }],
    timeout: 8000,
    allow: "all",
    run: async (bot, message, args, touse) => {
        if (!args[0]) return message.reply("You forgot to specify a query")

        let expr = args.join(" "), result;

        try {
            result = math.evaluate(expr);
        } catch (e) {
            let rr = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("`" + expr + "` cannot be evaluated.")
            return message.channel.send(rr);
        }

        if (result === "Infinity") result = "<a:inf:728620437650669588>";
        if (!isNaN(result)) result = result.toFixed(2);
        let e = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setDescription("`" + expr + "` = " + result + "")
        message.channel.send(e);

    }
}