//Required
const RPS = require('../../../../packages/discord-rock-paper-scissor/src');
const rps = new RPS({
    choiceReply: "You chose {move}",
    endTitle: "Game ended very very victoriously for {winner}",
    readyMessage: "Choose the dang moves kiddos",
    drawEndTitle: "Bruh nerds ended up getting a draw",
    choiceTitle: "Choose the move boiiiiiiiiiiiiiiiii",
    choiceDescription: "I  hope that you can read than click on buttons to choose the move",
    drawEndDescription: "{player1} chose : {player1move}\n\n{player2} chose : {player2move}\nStupid nerds arent they",
    endDescription: "[Winner 👑] {winner}'s move : {winnermove}\n\n[Looser 🤮] {looser}'s move : {loosermove}",
    chooseIn: "dm",
    colors: {
        drawEmbed: "#0505e7",
        endEmbed: "#1ae705",
        errorEmbed: "#e70580",
        readyEmbed: "#05b0e7"
    }
});

//export
module.exports = {
    name: "rockpaperscissor",
    aliases: ["rps"],
    category: "game",
    allow: "all",
    description: "Play RPS with someone or with me",
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
        try {
            let player2 = message.mentions.members.first()?.user;
            if (!player2) return rps.solo(message, bot).catch(e => console.log(e));
            else rps.duo(message, player2).catch(e => console.log(e))
        } catch (e) {
            console.log(e);
        }
    }
}