try {//Required
    const _ttt = require('../../../../packages/discord.tictactoe/src');
    const ttt = new _ttt();

    //export
    module.exports = {
        name: "tictactoe",
        aliases: ["ttt"],
        category: "game",
        allow: "all",
        description: "Play tic tac toe with someone or with me",
        args: "[user]",
        options: [{
            name: "user",
            type: 6,
            required: false,
            description: "User with whom you wanna play this game"
        }],
        timeout: 1000,
        run: async (bot, message) => {
            //code
            let player2 = message.mentions.members.first()?.user;
            if (!player2) return ttt.solo(message, bot);
            else ttt.duo(message, player2).catch(e => console.log(e))
        }
    }
} catch (E) {
    console.log(E);
}