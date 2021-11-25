const axios = require("axios");

module.exports = () => {
    setInterval(() => {
        axios.get("http://krazyapi-6969.glitch.me/api/discord").then((e) => console.log("s")).catch((e) => console.log("f"));
        axios.get("https://magical-quasar-peak.glitch.me").then((e) => console.log("s")).catch((e) => console.log("f"));
        axios.get("https://melodic-nonchalant-bush.glitch.me").then((e) => console.log("e")).catch((e) => console.log("f"));
    }, 12000)
}