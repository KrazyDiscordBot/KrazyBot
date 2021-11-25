//export
module.exports = {
    name: "kill",
    aliases: ["murder"],
    category: "fun",
    description: "kills anyone for you",
    args: "[Mention the user]",
    options: [{
        name: "User",
        description: "The user whom you want to kill",
        type: 6,
        required: true
    }],
    timeout: 10000,
    allow: "all",
    perms: "No special perms needed",
    reply: "Stop killing you demon , well you can kill once in **10** seconds, Right now you have to wait for **leftt",
    note: "No special perms are required by user",
    run: async (bot, message, args, touse) => {
        //code
        let died = message.mentions.members.first()?.user.username || message.author.username;
        let killer = message.mentions.members.first()?.user ? message.author.username : "Krazy Boi";
        let kills = [`${died} saw themself in the mirror and died because of B\*\*\*\*\*M\*\*\*\*\***__RIP__**\nMaybe Bloody marry �\\_(?)_/�`, `${died} robbed lot of candy and died because of dibatese`, `${died} killed ${killer} and ${killer}'s ghost killed them`, `${died} inhaled koka kula and died`, `${died} died while changing their own diapper`, `${killer} filled up ${died}\'s humidifier with booze and died from alcohol poisoning.`, `**${died}** was kicked into the sea to see a Sharkeey but they peed so they died of drinking it.`, `**${died}** was watching the TV but they died i do not know how`, `A retard known as **${died}** died due to Unknow reason`, `**${died}** filled up their humidifer with vodka and accidentally died from alcohol poisoning`, `**${died}** was killed by ${killer} with baby wipes`, `${killer} kicked**${died}** and their ass in a beer bareel and they drowned in a beer barrel`, `${killer} killied ${died} with some driver`];
        message.channel.send(kills[Math.floor(Math.random() * kills.length)])
    }
}