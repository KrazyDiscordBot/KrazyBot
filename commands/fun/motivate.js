//require stuff
module.exports = {
    name: "motivate",
    category: "fun",
    description: "motivates anyone for you",
    timeout: 3000,
    allow:"all",
    reply:"Damn how much motivation you want, you can have motivation once in **3** seconds, Right now you have to wait for **leftt**",
    perms: "No special perms needed",
    note: "No special perms are required by user",
    run: async (bot, message, args,touse) => {
        //code
            let user = message.mentions.members.first()?.id || message.author.id;
            
            let mov = ["Don't run behind Money. Run behind doing excellent work and money will run behind you !","Indeed you can't do anything you are a noob but don't worry evey noob can become a pro","watch some epic anime and get motivated as F","How much motivation you need are you depressed or something","I need motivation myself :( ","Don't be de-motivated nerd, Even nerds like you who can't do a single thing properly can be successful in life so always be motivated","Hey Gamers never die So why you dying because of de-motivation huh!","Don't worry about the world cause whatever you do everyone will complain about it","Don't worry about things like that people don't belives in you, Because everyone don't belives in god and we are just his creation"];
            message.channel.send(`<@${user}> ${mov[random.int(0, mov.length - 1)]}`)
    }
}