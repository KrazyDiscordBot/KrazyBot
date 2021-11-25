//Required
const ttt = require('../../../../packages/discord-clicking-game');
const game = new ttt();

//export
module.exports = {
    name: "click-game",
    aliases: ["click"],
    category: "game",
    allow: "all",
    description: "Play tic tac toe with someone or with me",
    args: "[user]",
    options: [{
        name: "module",
        type: 3,
        required: false,
        description: "Mention a user or type party for party mode"
    }],
    timeout: 10000,
    run: async (bot, message, args) => {
        //code
        let player2 = message.mentions.members.first()?.user || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(args[0]?.slice(3, args[0].length - 1));

        if (args[0]?.toLowerCase() === "party") game.party(message);
        else if (!player2) game.solo(message);
        else game.duo(message, player2)
    }
}