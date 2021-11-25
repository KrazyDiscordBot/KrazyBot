try {
    const Discord = require('discord.js');

    /**
     * 
     * @param {Discord.Message} message 
     * @param {*} bot 
     */
    async function solo(message) {
        let options = [1, 2, 3, 4, 5, 6, 7, 8, 9], user = [], botc = [];
        const row = await getComponents(options);
        let ended = false;

        const sent = await message.channel.send({ components: row, embeds: [{ color: "DARK_VIVID_PINK", title: "Tic Tac Toe", description: getDescription(user, botc) }] })

        while (options.length !== 0) {
            let data = await getChoice(message.author, message.channel, sent, options, user, botc);

            if(data.reason === "time" || data.reason === "cancel"){
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_RED", title: "Game was forcefully ended", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : Krazy Bot\n\nReason : **${data.reason === "time" ? `${data.user} took too much time to choose` : `${data.user} cancelled the game`}**` }] });
                ended = true;
                break;
            }

            options = data.options;
            user = data.player1;
            botc = data.bot;

            let rowss = await getComponents(options);
            sent.edit({ components: rowss, embeds: [{ color: "DARK_VIVID_PINK", title: "Tic Tac Toe", description: getDescription(user, botc) }] })

            let win = getWinner(user, botc);
            if (win === 0) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was an draw", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : Krazy Bot\n\nGame Result : **Draw**` }] });
                ended = true;
                break;
            } else if (win === 1) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setStyle("SUCCESS").setDisabled(true).setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for " + message.author.username, description: `Tic Tac Toe Game\n\nPlayer One [ Winner 👑 ] : ${message.author.username}\nPlayer Two [ Looser 🤢 ] : Krazy Bot\n\nGame Result : **Won By ${message.author.username}**` }] });
                ended = true;
                break;
            } else if (win === 2) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("DANGER").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for Krazy Bot", description: `Tic Tac Toe Game\n\nPlayer One [ Looser 🤢 ] : ${message.author.username}\nPlayer Two [ Winner 👑 ] : Krazy Bot\n\nGame Result : **Won By Krazy Bot**` }] });
                ended = true;
                break;
            }
        }
        if (ended) return;
        let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
        sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was an draw", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : Krazy Bot\n\nGame Result : **Draw**` }] });

    }

    /**
     * 
     * @param {Discord.Client} bot 
     * @param {Discord.Message} message 
     * @param {Discord.User} player1 
     * @param {Discord.User} player2 
     */
    async function duo(bot, message, player1, player2) {
        let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("y7ghjuiojioujoj").setDisabled(true).setStyle("SUCCESS").setEmoji("🕊").setLabel("Game Ended"))
    }

    

    function getEmoji(number) {
        if (number === 1) return "1️⃣";
        else if (number === 2) return "2️⃣";
        else if (number === 3) return "3️⃣";
        else if (number === 4) return "4️⃣";
        else if (number === 5) return "5️⃣";
        else if (number === 6) return "6️⃣";
        else if (number === 7) return "7️⃣";
        else if (number === 8) return "8️⃣";
        else if (number === 9) return "9️⃣";
        else return number;
    }

    function getNumber(emoji) {
        if (emoji === "1️⃣") return 1;
        else if (emoji === "2️⃣") return 2;
        else if (emoji === "3️⃣") return 3;
        else if (emoji === "4️⃣") return 4;
        else if (emoji === "5️⃣") return 5;
        else if (emoji === "6️⃣") return 6;
        else if (emoji === "7️⃣") return 7;
        else if (emoji === "8️⃣") return 8;
        else if (emoji === "9️⃣") return 9;
        else return emoji;
    }

    async function getComponents(options) {
        const row1 = new Discord.MessageActionRow(), row2 = new Discord.MessageActionRow(), row3 = new Discord.MessageActionRow();
        console.log(row1.components.length)
        for (let i = 1; i < 4; i++)row1.addComponents(new Discord.MessageButton().setCustomId(`${i}_krazy_bot_ttt`).setStyle("PRIMARY").setEmoji(getEmoji(i)).setDisabled(!options.includes(i)))
        for (let i = 4; i < 7; i++)row2.addComponents(new Discord.MessageButton().setCustomId(`${i}_krazy_bot_ttt`).setStyle("PRIMARY").setEmoji(getEmoji(i)).setDisabled(!options.includes(i)))
        for (let i = 7; i < 10; i++)row3.addComponents(new Discord.MessageButton().setCustomId(`${i}_krazy_bot_ttt`).setStyle("PRIMARY").setEmoji(getEmoji(i)).setDisabled(!options.includes(i)))

        return [row1, row2, row3];
    }

    /**
     * 
     * @param {Discord.User} user 
     * @param {Discord.TextChannel} channel 
     * @returns 
     */
    function getChoice(user, channel, message, options, player1, bot) {
        return new Promise(async (res, rej) => {
            try {
                channel.send({ content: `${user.toString()}, Choose your next move from the buttons` })

                const collector = channel.createMessageComponentCollector({ filter: (i) => i.user.id === user.id && (i.customId.endsWith("_krazy_bot_ttt")), time: 30000 });

                collector.on('collect', (interaction) => {
                    const userChoice = parseInt(interaction.customId[0]);

                    options = options.filter(v => v !== userChoice);
                    player1.push(userChoice);
                    if (bot && options.length > 0) {
                        let c = options[Math.floor(Math.random() * options.length)];
                        bot.push(c);
                        options = options.filter(v => v !== c);
                    }

                    interaction.reply({ ephemeral: true, content: "You chose" + getEmoji(userChoice) + "\nAnd I chose : " + getEmoji(bot[bot.length - 1]) });

                    collector.stop(userChoice);
                });

                collector.once('end', async (f, r) => {
                    if (r === "time") res({ reason: "time", user: user.username });
                    else res({ choice: getEmoji(r), options: options, player1: player1, bot: bot });
                });
            } catch (e) {
                console.log(e)
                rej(e);
            }
        })
    }

    function getWinner(player1, player2) {
        player1.forEach((v, i) => player1[i] = getNumber(v))
        player2.forEach((v, i) => player2[i] = getNumber(v))

        if ((player1.includes(1) && player1.includes(2) && player1.includes(3)) || (player1.includes(4) && player1.includes(5) && player1.includes(6)) || (player1.includes(7) && player1.includes(8) && player1.includes(9)) || (player1.includes(1) && player1.includes(4) && player1.includes(7)) || (player1.includes(5) && player1.includes(2) && player1.includes(8)) || (player1.includes(9) && player1.includes(2) && player1.includes(6)) || (player1.includes(7) && player1.includes(5) && player1.includes(3))) return 1;
        else if ((player2.includes(1) && player2.includes(2) && player2.includes(3)) || (player2.includes(4) && player2.includes(5) && player2.includes(6)) || (player2.includes(7) && player2.includes(8) && player2.includes(9)) || (player2.includes(1) && player2.includes(4) && player2.includes(7)) || (player2.includes(5) && player2.includes(2) && player2.includes(8)) || (player2.includes(9) && player2.includes(2) && player2.includes(6)) || (player2.includes(7) && player2.includes(5) && player2.includes(3))) return 2;
        else if (player1.length + player2.length === 9) return 0;
        else return -1;
    }

    module.exports = {
        solo, duo
    }
} catch (e) {
    console.log(e);
}