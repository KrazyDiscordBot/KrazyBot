//Required
const game = require('../../../../packages/discord-fight-game/src');

//export
module.exports = {
    name: "fight",
    aliases: ["pvp"],
    category: "game",
    allow: "all",
    description: "Fight with someone or with me",
    args: "[user]",
    options: [{
        name: "user",
        type: 6,
        required: false,
        description: "User with whom you wanna play this game"
    }],
    timeout: 10000,
    run: async (bot, message) => {
        //code
        const fight = new game(bot);

        let player2 = message.mentions.members.first()?.user;
        if (!player2) return fight.solo(message);
        else fight.duo(message, player2)
    }
}