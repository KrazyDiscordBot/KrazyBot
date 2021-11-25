//require stuff
const Discord = require("discord.js");
const api = require("novelcovid");
api.settings({ baseUrl: "https://disease.sh" });

//export
module.exports = {
  name: "covid",
  allow: "all",
  aliases: ["cov", "corona"],
  category: "general",
  description: "Shows the corona releated info",
  args: "[global | country name]",
  options: [{
    name: "module",
    type: 3,
    required: false,
    description: "Global for global stats or a country name"
  }],
  timeout: 8000,
  run: async (bot, message, args) => {
    //code
    const option = args[0].toLowerCase();

    if (!option || options === "global" || options === "all") {
      const data = await api.all();

      const embed = new Discord.MessageEmbed().setColor("DARK_GREY").setTitle("Global Corona Virus Stats").addFields([
        { name: "Total Cases 🌐", value: data.cases, inline: true },
        { name: "Total Deaths ☠", value: data.deaths, inline: true },
        { name: "Total Recovered ♻", value: data.recovered, inline: true },
        { name: "Todays Cases 🌏", value: data.todayCases, inline: true },
        { name: "Todays Deaths 💀", value: data.todayDeaths, inline: true },
        { name: "Todays Recovered 😌", value: data.todayRecovered, inline: true },
        { name: "Active Cases 🟢", value: data.todayRecovered, inline: true },
        { name: "Cirtical Cases 🚨", value: data.todayRecovered, inline: true },
        { name: "Affected Countries ☣", value: data.affectedCountries, inline: true },
      ]);

      message.channel.send({ embeds: [embed] });
    } else {
      const data = await api.countries({ country: options });

      const embed = new Discord.MessageEmbed().setColor("DARK_GREY").setTitle(data.country + " Corona Virus Stats").setThumbnail(data.countryInfo.flag).addFields([
        { name: "Total Cases 🌐", value: data.cases, inline: true },
        { name: "Total Deaths ☠", value: data.deaths, inline: true },
        { name: "Total Recovered ♻", value: data.recovered, inline: true },
        { name: "Todays Cases 🌏", value: data.todayCases, inline: true },
        { name: "Todays Deaths 💀", value: data.todayDeaths, inline: true },
        { name: "Todays Recovered 😌", value: data.todayRecovered, inline: true },
        { name: "Active Cases 🟢", value: data.todayRecovered, inline: true },
        { name: "Cirtical Cases 🚨", value: data.todayRecovered, inline: true },
        { name: "Affected Countries ☣", value: data.affectedCountries, inline: true },
      ]);

      message.channel.send({ embeds: [embed] });
    }
  }
}


// let p = "";
// let d, r, c, ir, dr, rr, ta;
// if (!args[0]) {
//   let embed = new Discord.MessageEmbed()
//     .setColor("RED")
//     .setDescription(
//       "⛔ This is not how you are supposed to use this command you can use it like:\n`k!covid global` or `k!covid country <country name>` or `k!covid states <state name>`"
//     );
//   message.channel.send(embed);
// }
// let type = args[0];
// try {
//   db.set(`data_${message.author.id}.timeout.covid`, Date.now() + 3000);
//   if (type == "global") {
//     const data = await api.all();
//     p = parseInt(data.population);
//     d = parseInt(data.deaths);
//     r = parseInt(data.recovered);
//     c = parseInt(data.cases);
//     ir = (c / p) * 100;
//     dr = (d / p) * 100;
//     rr = (r / p) * 100;
//     ta = (data.todayCases - (data.todayDeaths + data.todayRecovered)) * 1;
//     let embed = new Discord.MessageEmbed()
//       .setTitle("🌏Global Covid Status🌏")
//       .setColor("RANDOM")
//       .addField("**🌏Cases**", `${data.cases}\n(+${data.todayCases})`, true)
//       .addField(
//         "💀**Deaths**",
//         `${data.deaths}\n(+${data.todayDeaths})`,
//         true
//       )
//       .addField("🟢**Active**", `${data.active}\n(${ta})`, true)
//       .addField(
//         "😊**Recovered**",
//         `${data.recovered}\n(+${data.todayRecovered})`,
//         true
//       )
//       .addField("🔴**Critical**", data.critical, true)
//       .addField("🧑‍🤝‍🧑**Population**", data.population, true)
//       .addField("💀**Infection rate**", ir.toFixed(3) + "%", true)
//       .addField("🔴**Death rate**", dr.toFixed(3) + "%", true)
//       .addField("😊**Recovery rate**", rr.toFixed(3) + "%", true);
//     message.channel.send(embed);
//   } else if (type == "country") {
//     try {
//       if (!args[1])
//         return message.channel.send("You didn't provide country name");
//       const data = await api.countries({ country: args[1] });
//       if (data.population == null)
//         return message.channel.send("Country not found");
//       p = parseInt(data.population);
//       d = parseInt(data.deaths);
//       r = parseInt(data.recovered);
//       c = parseInt(data.cases);
//       ir = (c / p) * 100;
//       dr = (d / p) * 100;
//       rr = (r / p) * 100;
//       ta = (data.todayCases - (data.todayDeaths + data.todayRecovered)) * 1;
//       let embed = new Discord.MessageEmbed()
//         .setTitle("🌏" + args[1] + " Covid Status🌏")
//         .setColor("RANDOM")
//         .addField(
//           "**🌏Cases**",
//           `${data.cases}\n(+${data.todayCases})`,
//           true
//         )
//         .addField(
//           "💀**Deaths**",
//           `${data.deaths}\n(+${data.todayDeaths})`,
//           true
//         )
//         .addField("🟢**Active**", `${data.active}\n(${ta})`, true)
//         .addField(
//           "😊**Recovered**",
//           `${data.recovered}\n(+${data.todayRecovered})`,
//           true
//         )
//         .addField("🔴**Critical**", data.critical, true)
//         .addField("🧑‍🤝‍🧑**Population**", data.population, true)
//         .addField("💀**Infection rate**", ir.toFixed(3) + "%", true)
//         .addField("🔴**Death rate**", dr.toFixed(3) + "%", true)
//         .addField("😊**Recovery rate**", rr.toFixed(3) + "%", true);
//       message.channel.send(embed);
//     } catch (error) {
//       message.channel.send("Country not found");
//     }
//   } else if (type == "states") {
//     try {
//       if (!args[1])
//         return message.channel.send("You didn't provide state name");
//       const data = await api.states({ state: args[1] });
//       if (data.population == null)
//         return message.channel.send("State not found");
//       p = parseInt(data.population);
//       d = parseInt(data.deaths);
//       r = parseInt(data.recovered);
//       c = parseInt(data.cases);
//       ir = (c / p) * 100;
//       dr = (d / p) * 100;
//       rr = (r / p) * 100;
//       ta = (data.todayCases - (data.todayDeaths + data.todayRecovered)) * 1;
//       let embed = new Discord.MessageEmbed()
//         .setTitle("🌏" + args[1] + " Covid Status🌏")
//         .setColor("RANDOM")
//         .addField(
//           "**🌏Cases**",
//           `${data.cases}\n(+${data.todayCases})`,
//           true
//         )
//         .addField(
//           "💀**Deaths**",
//           `${data.deaths}\n(+${data.todayDeaths})`,
//           true
//         )
//         .addField("🟢**Active**", `${data.active}\n(${ta})`, true)
//         .addField(
//           "😊**Recovered**",
//           `${data.recovered}\n(+${data.todayRecovered})`,
//           true
//         )
//         .addField("🔴**Critical**", data.critical, true)
//         .addField("🧑‍🤝‍🧑**Population**", data.population, true)
//         .addField("💀**Infection rate**", ir.toFixed(3) + "%", true)
//         .addField("🔴**Death rate**", dr.toFixed(3) + "%", true)
//         .addField("😊**Recovery rate**", rr.toFixed(3) + "%", true);
//       message.channel.send(embed);
//     } catch (error) {
//       message.channel.send("State not found");
//     }
//   } else {
//     message.channel.send(
//       "Search like this: `k!covid` country <country name>\nk!covid global"
//     );
//   }
// } catch (error) {
//   message.channel.send("Country not found");
// }