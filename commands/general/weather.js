//require stuff
const Discord = require("discord.js");
const weather = require("weather-js");

//export
module.exports = {
    name: "weather",
    category: "general",
    description: "Shows the weather",
    args: "<location>",
    options: [{
        name: "location",
        type: 3,
        required: false,
        description: "The location"
    }],
    timeout: 8000,
    allow:"all",
    run: async (bot, message, args) => {
        //code
            if (!args[0]) return message.channel.send('Please specify a location')
            weather.find({ search: args.join(" "), degreeType: 'C' }, function (error, result) {
                if (error) return message.channel.send("Location not found");
                if (result === undefined || result.length === 0) return message.channel.send('**Invalid** location');
                db.set(`data_${message.author.id}.timeout.weather`,Date.now()+5000)
                var current = result[0].current;
                var forecast = result[0].forecast[0];
                let h = parseInt(forecast.high);
                let l = parseInt(forecast.low);
                let avt = (h + l) / 2
                const weatherinfo = new Discord.MessageEmbed()
                    .setDescription(`**${current.skytext}**`)
                    .setAuthor(`Weather forecast for ${current.observationpoint}`)
                    .setThumbnail(current.imageUrl)
                    .setColor("RANDOM")
                    .addField("Temperature", `${current.temperature}°C`, true)
                    .addField("Highest Temprature", `${forecast.high}°C`, true)
                    .addField("Lowest Temprature", `${forecast.low}°C`, true)
                    .addField("Average Temprature", avt + "°C", true)
                    .addField("Wind", current.winddisplay, true)
                    .addField("Feels Like", `${current.feelslike}°`, true)
                    .addField("Humidity", `${current.humidity}%`, true)
                    .addField("Updated at", current.observationtime, true)
                    .addField("day", current.day, true)
                    .setFooter(`Date:${current.date}`)
                message.channel.send(weatherinfo)
            })
    }
}