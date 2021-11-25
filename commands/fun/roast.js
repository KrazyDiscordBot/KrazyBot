module.exports = {
    name: "roast",
    category: "fun",
    description: "Get roasted :) or mention someone else to roast them",
    options: [{
        name: "User",
        description: "the person whom you wanna roast",
        type: 6,
        required: false
    }],
    args: "[mention the user]",
    timeout: 5000,
    allow: "all",
    reply: "you can make me roast someone once in **5** seconds, Right now you have to wait for **leftt**",
    perms: "\`Embed links\`",
    note: "No special perms are required by user",
    run: async (bot, message, args, touse) => {
        //code
        const user = message.mentions.members.first()?.user || message.author;
        if (user.id == "732479990012313682") return message.reply("Baka Don't you order me to roast myself");

        let roasts = [`Eww what is this smell , wait it is **<@${user.id}>**`, `**<@${user.id}>**\nRoses are red\nViolets are blue\nI have five fingers\nMiddle one is for you`, `I'm not questioning **<@${user.id}>**\'s honour I'm denying its existence`, `**<@${user.id}>** are as useless as the "ueue" in "queue"`, `Come again. I dont have a super brain to digest all that crap (i.e. **<@${user.id}>)**`, `I don't exactly hate <@${user.id}> but if u were on fire and I had water, I'd drink it`, `I would slap <@${user.id}> but that will be animal abuse`, `We should never forget people\'s faces but for <@${user.id}> i will make an exception`, `I would love to insult <@${user.id}> but i afraid i won't do as well as nature did`, `<@${user.id}>Roses are red.\nYour blood is too.\nYou look like a monkey\nAnd belong in a zoo.\nDo not worry,\nI'll be there too.\nNot in the cage,\nBut laughing at you.`, `Light travels faster than sound. This is why some people like **<@${user.id}>** appear bright until you hear them speak.`, `If I was **<@${user.id}>**\'s father, I would still be trying to abort him/her`, `<@${user.id}> Keep rolling ur eyes maybe u'll find a brain back ther`, `<@${user.id}> must have been born on a highway cause thats where most of the accidents happen`, `2 wrongs don't make a right, and **<@${user.id}>** parents have once again proven that`, `When I see <@${user.id}> face, there's not a thing I would change-except the direction im walking in`, `If I wanted to commit suicide then I'd jump from **<@${user.id}>**\'s ego down onto his/her intelligence.`, `<@${user.id}> You can't take a joke but u sure walk around looking like one.`, `If I've ever offended u, I'm sorry....\n....that you're a little beech`, `So if I typed 'Idiot' on Google, then <@${user.id}>\'s image will come up?`, `<@${user.id}>\'s birth certificate is an apology letter from durex.`, `<@${user.id}>,you are like the first piece of bread.\nEverybody touches u but no one wants u`];
        message.channel.send(roasts[Math.floor(Math.random() * roasts.length)])
    }
}