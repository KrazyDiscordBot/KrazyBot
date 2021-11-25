const { createCanvas, loadImage } = require('canvas');
const { GuildMember } = require('discord.js');
const serverData = require("../types/guildData");

/**
 * @param {serverData} serverDB 
 * @param {GuildMember} member
 */
module.exports = (serverDB, member) => {
    return new Promise(async (resolve, reject) => {
        try {
            const canvas = createCanvas(1280, 576), avatar = await loadImage(member.user.displayAvatarURL({ dynamic: false, format: "png" })), username = `${member.user.username}#${member.user.discriminator}`, background = serverDB.leaveConfig.background_image.startsWith("#") ? serverDB.leaveConfig.background_image : await loadImage(serverDB.leaveConfig.background_image);
            const ctx = canvas.getContext('2d');
            let above = serverDB.leaveConfig.l1, below = serverDB.leaveConfig.l2;

            // Actually creating an image
            ctx.textAlign = "center";

            if (typeof (img) === "string") {
                ctx.fillStyle = img;
                ctx.fillRect(0, 0, w, h);
            } else ctx.drawImage(img, 0, 0, w, h);

            // Middle circle for Avatar Background
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'white';
            ctx.stroke(); ctx.closePath();

            // Adding the text
            ctx.font = "50px playfair display sc";
            ctx.fillStyle = serverDB.leaveConfig.l1c;
            ctx.fillText(above, 640, 120, 1200);
            ctx.font = "50px playfair display sc";
            ctx.fillStyle = serverDB.leaveConfig.l2c;
            ctx.fillText(below, 640, 520, 1200);
            ctx.font = "35px Currency Font";
            ctx.fillStyle = serverDB.leaveConfig.uc;
            ctx.fillText(username, 640, 440, 500);

            // Cliping the Avatar to circle
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            // Adding the avatar
            ctx.drawImage(avatar, 540, 188, 200, 200);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png");

            resolve(attachment);
        } catch (e) {
            reject(e);
        }
    })
}