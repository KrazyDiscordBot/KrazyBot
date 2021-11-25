const getType = require("./getType");
const mongoose = require('mongoose');
const { Client, Collection } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const { getOptions } = require(".");

class Bot extends Client {
    constructor(options) {
        super(options);

        this.commands = new Collection();
        this.aliases = new Collection();
        this.categories = new Array();
        this.snipe = new Collection();
        this.esnipe = new Collection();
        this.gsnipe = new Collection();
        this.owner = "441943765855240192";
        this.team = ["441943765855240192"]
        this.pagination = require('./page');
        this.getPower = require('./getPower');
        this.getMutedRole = require('./getMutedRole');
        this.once('ready', () => { this.#setEvents(); this.#setSlashCommands(); })

        mongoose.connect(process.env.MONGO_URI2, { useUnifiedTopology: true, useNewUrlParser: true }).then(v => {
            console.log("Database Connected");
            this.#setCommands().then(() => this.login(process.env.BETA_TOKEN)).catch(e => console.log(e))
        }).catch(e => {
            console.log(e)
        })
    }

    #setCommands() {
        return new Promise(async (res, rej) => {
            try {
                readdirSync('./commands/').forEach(dir => {
                    this.categories.push(dir[0].toUpperCase() + dir.substring(1, dir.length));
                    const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('test.js'));

                    for (let i = 0; i < commands.length; i++) {
                        let file = commands[i];

                        let pull = require(`../commands/${dir}/${file}`);
                        if (pull.args && !pull.options) {
                            pull.options = getOptions(pull.args, pull.argsDescription, pull.argsType);
                        }

                        if (pull.options) {
                            pull.options.forEach((v, i) => {
                                pull.options[i].name = pull.options[i].name.trim().toLowerCase().replace(/ /g, "-");
                                pull.options[i].type = getType(pull.options[i].type);
                            })
                        }

                        if (pull.name) {
                            this.commands.set(pull.name, pull);
                        }

                        if (pull.aliases && pull.name && Array.isArray(pull.aliases))
                            pull.aliases.forEach(alias => this.aliases.set(alias, pull.name));
                    }

                    res("done")
                });
            } catch (e) {
                console.log(e)
                rej(e)
            }
        });
    }

    #setEvents() {
        readdirSync('./events').forEach(f => {
            this.on(f.substring(0, f.length - 3), (a, b, c, d) => require('../events/' + f)(this, a, b, c, d))
        });
    }

    async #setSlashCommands() {
        try {
            const commands = [];
            this.commands.forEach(v => {
                if (v.name && !v.hidden) commands.push({ name: v.name.toLowerCase().replace(/ /g, "-"), description: v.description || "No description was provided POG", options: v.options || [] });
            });

            const rest = new REST({ version: '9' }).setToken(process.env.BETA_TOKEN);

            await rest.put(Routes.applicationGuildCommands(this.user.id, "732883841395720213"), { body: commands });

            console.log("Slash Commands are UP")
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = Bot;