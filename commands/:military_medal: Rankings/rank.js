const { MessageAttachment } = require('discord.js');
const {createCanvas, loadImage } = require('canvas');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./data.sqlite');
const {join} = require('path');
module.exports = {
    name: "rank",
    category: "ranking",
    description: "Check rank",
    usage: "rank [@tag]",
    example: "rank @phamleduy04",
    note: "Max level là 999",
    run: async (client, message, args) => {
        const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'xpdata';").get();
        if (!table['count(*)']) {
          // If the table isn't there, create it and setup the database correctly.
          sql.prepare("CREATE TABLE xpdata (id TEXT PRIMARY KEY, user TEXT, guild TEXT, xp INTEGER, level INTEGER);").run();
          // Ensure that the "id" row is always unique and indexed.
          sql.prepare("CREATE UNIQUE INDEX idx_xpdata_id ON xpdata (id);").run();
          sql.pragma("synchronous = 1");
          sql.pragma("journal_mode = wal");
        }
        const insert = sql.prepare("SELECT * FROM xpdata WHERE user = ? AND guild = ?")
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if (member.user.bot) return message.reply('Bạn không thể xem rank của bot!');
        let data = insert.get(member.user.id, message.guild.id)
        let server_data = sql.prepare("SELECT * FROM xpdata WHERE guild = ? ORDER BY level DESC, xp DESC;").all(message.guild.id);
        let rank = server_data.findIndex(userdata => userdata.user == member.user.id);
        if (rank == -1) return message.reply('Người bạn tìm không có rank!')
        rank++; //real rank
        const canvas = createCanvas(1000, 333);
        const ctx = canvas.getContext("2d");
        const background = await loadImage(join(__dirname, "..", "..",  "background", "rank.jpg"))
        let next_level_xp = data.level * 300
        if (next_level_xp.toString().length >= 4) {
          next_level_xp = next_level_xp/1000
          let int_part = Math.trunc(next_level_xp)
          let float_part = Number((next_level_xp - int_part).toFixed(1));
          next_level_xp = `${int_part + float_part}K`
        } 
        let user_xp = data.xp
        if (user_xp.toString().length >= 4) {
          user_xp = user_xp/1000
          let int_part = Math.trunc(user_xp); 
          let float_part = Number((user_xp-int_part).toFixed(1));
          user_xp = `${int_part + float_part}K`
        }
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.lineWidth = 4
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000"
        ctx.fillRect(180, 216, 770, 65);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeRect(180, 216, 770, 65); //same as fillRect()
        ctx.stroke();
        ctx.fillStyle = "#f79e58";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(180, 216, ((100 / (data.level * 300)) * data.xp) * 7.7, 65);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.font = "45px Oswald";
        ctx.textAlign = "center";
        ctx.fillStyle = "#000000";
        ctx.fillText(`${user_xp} / ${next_level_xp} XP`, 600, 263);
        ctx.textAlign = 'left';
        ctx.fillText(member.user.tag, 350, 120)
        ctx.font = "35px cadena";
        ctx.fillText("Level: ", 300, 180)
        ctx.fillText(data.level, 400, 180);
        ctx.fillText("Rank: ", 550, 180)
        ctx.fillText(`#${rank}`, 650, 180)
        ctx.arc(170, 160, 120,0, Math.PI * 2, true);
        ctx.lineWidth = 6
        ctx.strokeStyle = "#000000";
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        const avatar = await loadImage(member.user.displayAvatarURL({format: "jpg"}));
        ctx.drawImage(avatar, 40, 40, 250, 250);
        const attachment = new MessageAttachment(canvas.toBuffer(), "rank.png")
        message.channel.send(`Rank của bạn **${member.user.username}**`,attachment);
    }
}
