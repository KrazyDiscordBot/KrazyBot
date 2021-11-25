//export
module.exports = {
    name: "dice",
    category: "game",
    aliases: ["roll"],
    allow: "all",
    description: "flips the coin",
    timeout: 3000,
    options: [{
        name: "choice",
        description: "your guess on dice's roll",
        type: 4,
        required: true,
        choices: [{
            name: "1",
            value: 1,
        }, {
            name: "2",
            value: 2,
        },
        {
            name: "3",
            value: 2,
        }, {
            name: "4",
            value: 4,
        },
        {
            name: "5",
            value: 5,
        }, {
            name: "6",
            value: 6,
        },]
    }],
    args: "<choice>",
    run: async (bot, message, args) => {
        //code

        const choice = Math.floor(Math.random() * 6) + 1;

        const msg = await message.reply({ embeds: [{ color: "BLUE", title: "Flipping the coin" }] })
        console.log(msg)
        setTimeout(function () {
            msg.edit(`So the Result isss ${choice}\n\n${choice === parseInt(args[0]) ? "GG You guessed it right" : "RIP you lost nerd!!!"}`)
        }, 1000);
    }
}
