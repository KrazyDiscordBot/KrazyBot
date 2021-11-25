//require
const Discord = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports = {
    name: "searchanime",
    args: "<anime name>",
    allow: "all",
    aliases: ["sanime"],
    category: "anime",
    description: "Get the information about any anime",
    args: "<name>",
    args:"[user]",
    options:[{
        name:"anime",
        description:" the anime name, who's info you want to get",
        type:3,
        required:true
    }],
    timeout: 5000,
    run: async (bot, message, args) => {
        //code
        var search = message.content.slice(args.join(" "));
        kitsu.searchAnime(search).then(async result => {
            if (result.length === 0) {
                return message.channel.send(`Anime not found **${search}**!`);
            }
            var anime = result[0];
            if (anime.nsfw == true && message.channel.nsfw == false) return message.reply("this anime contains NSFW i can't show it in non-nsfw channel, Sorry");
            let embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                .addField('❯\u2000\Status', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
                .setThumbnail(anime.posterImage.original, 100, 200);
            return message.channel.send({ embed })
        }).catch(err => {
            return message.channel.send(`Sed Anime not found (**${search}**)!`);
        });
    }
}