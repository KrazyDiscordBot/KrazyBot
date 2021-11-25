const Discord = require('discord.js');

async function solo(message, bot) {
    const db = await getChoice(message.author, message.channel);
    const userChoice = db.choice;
    const sent = db.message;
    const choice = getEmoji(Math.floor(Math.random() * 3) + 1);

    let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("y7ghjuiojioujoj").setDisabled(true).setStyle("SUCCESS").setEmoji("🕊").setLabel("Game Ended"))

    if (userChoice === choice) { // draw
        sent.edit({ embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game ended with an Draw", description: `${message.author.username} chose : ${userChoice}\n\n${message.guild.me.nickname || bot.user.username} chose : ${choice}` }], components: [row] });
    } else if ((userChoice === "✊" && choice === "✌️") || (userChoice === "🤚" && choice === "✊") || (userChoice === "✌️" && choice === "🤚")) { // user win
        sent.edit({ embeds: [{ color: "GREEN", title: `The game ended victoriously for ${message.author.username}`, description: `${message.author.username} chose : ${userChoice}\n\n${message.guild.me.nickname || bot.user.username} chose : ${choice}` }], components: [row] });
    } else { // User loose
        sent.edit({ embeds: [{ color: "GREEN", title: `${message.author.username} was defeated`, description: `${message.author.username} chose : ${userChoice}\n\n${message.guild.me.nickname || bot.user.username} chose : ${choice}` }], components: [row] });
    }
}

function getEmoji(number) {
    if (number === 1) return "✊";
    else if (number === 3) return "✌️";
    else if (number === 2) return "🤚";
    else return number;
}

/**
 * 
 * @param {Discord.Client} bot 
 * @param {Discord.Message} message 
 * @param {Discord.User} player1 
 * @param {Discord.User} player2 
 */
async function duo(bot, message, player1, player2) {

    const sent = await message.channel.send({ embeds: [{ color: "ORANGE", title: "Check your DM to play RPS game" }] });
    let no = false;

    let player1Choice = "";
    await message.channel.send({ content: `${player1.toString()}`, reply: { messageReference: sent.id } });
    await getChoice(player1, await player1.createDM()).then(v => player1Choice = v.choice).catch(e => no = e.username)
    let player2Choice = "";
    await message.channel.send({ content: `${player2.toString()}`, reply: { messageReference: sent.id } });
    await getChoice(player2, await player2.createDM()).then(v => player2Choice = v.choice).catch(e => no = e.username);

    if (no !== false) return sent.edit({ components: [], embeds: [{ color: "RED", title: `I was unaable to DM ${no}, so please open DM than try again.` }] })

    let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("y7ghjuiojioujoj").setDisabled(true).setStyle("SUCCESS").setEmoji("🕊").setLabel("Game Ended"))

    if (player1Choice === player2Choice) { // draw
        sent.edit({ embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game ended with an Draw", description: `${player1.username} chose : ${player1Choice}\n\n${player2.username} chose : ${player2Choice}` }], components: [row] });
    } else if ((player1Choice === "✊" && player2Choice === "✌️") || (player1Choice === "🤚" && player2Choice === "✊") || (player1Choice === "✌️" && player2Choice === "🤚")) { // player 1 won
        sent.edit({ embeds: [{ color: "GREEN", title: `The game ended victoriously for ${player1.username}`, description: `${player1.username} chose : ${player1Choice}\n\n${player2.username} chose : ${player2Choice}` }], components: [row] });
    } else { // player 2 won
        sent.edit({ embeds: [{ color: "GREEN", title: `${player1.username} was defeated`, description: `${player1.username} chose : ${player1Choice}\n\n${player2.username} chose : ${player2Choice}` }], components: [row] });
    }
}

/**
 * 
 * @param {Discord.User} user 
 * @param {Discord.TextChannel} channel 
 * @returns 
 */
function getChoice(user, channel) {
    return new Promise(async (res, rej) => {
        try {
            const row = new Discord.MessageActionRow().addComponents([new Discord.MessageButton().setCustomId("1_rock_paper_scissor").setStyle("PRIMARY").setEmoji("✊").setLabel("Rock"), new Discord.MessageButton().setCustomId("2_rock_paper_scissor").setStyle("PRIMARY").setEmoji("🖐").setLabel("Paper"), new Discord.MessageButton().setCustomId("3_rock_paper_scissor").setStyle("PRIMARY").setEmoji("✌").setLabel("Scissor")])
            let sent;

            channel.send({ components: [row], embeds: [{ color: "FUCHSIA", title: "Rock Paper Scissor", description: "Choose your move by clickling on buttons" }] }).catch((e) => rej(user)).then(v => sent = v);

            const collector = channel.createMessageComponentCollector({ filter: (i) => i.user.id === user.id && (i.customId.endsWith("_rock_paper_scissor")) });

            collector.on('collect', (interaction) => {
                const userChoice = parseInt(interaction.customId[0]);

                interaction.reply({ ephemeral: true, content: "OKay so nerd's choice " + getEmoji(userChoice) })

                collector.stop(userChoice);
            });

            collector.once('end', (f, r) => res({ choice: getEmoji(r), message: sent }));
        } catch (e) {
            console.log(e)
            rej(e);
        }
    })
}

module.exports = {
    solo, duo
}