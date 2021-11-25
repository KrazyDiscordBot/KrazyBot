//Required
const { serverModel } = require("../../models");

//export
module.exports = {
    name: "hack",
    category: "fun",
    description: "hacks anyone for you",
    args: "<Mention the User>",
    options: [{
        name: "User",
        description: "The user whom you want to hack",
        type: 6,
        required: true
    }],
    timeout: 10000,
    allow: "all",

    run: async (bot, message, args, serverDB) => {
        //code
        let pass = ["\*\*X69XxX", "6\*xD69\*\*", "\*\*xxx/*/*k", "C\*m$h0t69", "ILoveN\*\*\*s", "\*\*LoL\*69", "F\*meD\*\*\*y", "po\*\*l0V\*r", "INEEDYOU", "IAMSOLONELY", "AmIeVeNAliVe", "PaSsWoRDDDD", "IaMaD\*uk", "IfoRgoTmYpsowrD", "Bruv\*--@sax"];
        let id = ["jerk@fme.com", "hugetity@6969.com", "nerd@nerd.hub", "epicgaymer@hotmail.com", "epicnerd@jerkme.com", "cumat@mefor69.co.in", "mailme@night.di\*k", "helpme@sir.in", "iNeddConStIrUbTor@gg.com", "iMNotDenk@gamil.outlook.co"];
        let lm = ["F me daddy", "grab my N\*\*\*\*", "I want you d i\*k", "I Love Krazy Bot", "Gamers never die", "Humans shall \*\*\*", "plz do not bully me", "Why you bully me", "kill me", "oo yeah yes yes", "Cyka Blyat", "hacking iz easy", "No one can hack me", "Try me BITCHHHHHHHHHHHHHHHHHHHHHh", "PleAsE DoNoT LeAvEME! 🙏🙏🥺", "I fell in love my first time walking away", "When will I learn to have a good heart?", "Our word means war, our fight, living hell", "We live for one another", "Was I dreaming? Yeah, yeah, yeah, yeah", "My love is always riding high", "Put in deep DadYYYDDyyy", "You make me feel like hell is why I cry", "They say that life sucks, I disagree", "They say the end is near, I disagree", "They say hell will get me, I disagree", "Go straight to the hell from here!"];

        let user = message.mentions.members.first();
        if (!user) return message.reply("Dude mention the person whom u want to hack");
        if (user.id == message.author.id) return message.reply("Fool you are not allowed to hack yourself");
        serverModel.findOneAndUpdate({ id: message.guild.id }, { "basicConfig.breakChannel": serverDB.basicConfig.breakChannel.push(message.channel.id) })
        message.channel.send("Started hacking " + user.user.username + "\n`Calling the hacker to hack")
            .then(msg => {
                setTimeout(function () {
                    msg.edit(`Hacker Ignored my call`)
                }, 1300);
                setTimeout(function () {
                    msg.edit(`Nevermind Starting the hack\nInjecting Virus.`)
                }, 3300);
                setTimeout(function () {
                    msg.edit(`Virus Injected Successfully`)
                }, 4800);
                setTimeout(function () {
                    msg.edit(`Got login details (thanks to humanz.hackers.exe)`)
                }, 6500);
                setTimeout(function () {
                    msg.edit(`Email: \`${id[Math.floor(Math.random() * id.length)]}\`\nPassword: \`${pass[Math.floor(Math.random() * pass.length)]}\``)
                }, 9200);
                setTimeout(function () {
                    msg.edit(`Got their friend List\nR.I.P. this nerd have -1 friends`)
                }, 12300);
                setTimeout(function () {
                    msg.edit(`Found their most Used sentence \`${lm[Math.floor(Math.random() * lm.length)]}\``)
                }, 14100);
                setTimeout(function () {
                    msg.edit(`Found their ID adress: \`69.6.9.420\`\nHappy Hacking!`)
                }, 17400);
                setTimeout(function () {
                    msg.edit(`Giving their browsing history to their parents RIP`)
                }, 19000);
                setTimeout(async function () {
                    serverModel.findOneAndUpdate({ id: message.guild.id }, { "basicConfig.breakChannel": serverDB.basicConfig.breakChannel.filter(v => v !== message.channel.id) })
                    msg.edit("Removed all the traces\n.Hack Done , Piece of Cake\n")
                }, 21000)
                setTimeout(async () => {
                    await message.reply("i hacked for you now i am waiting for mine payment")
                }, 22000);
            });
    }
}
