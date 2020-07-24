const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");
const db = require('quick.db');
module.exports = {
    name: "kick",
    category: "🔧moderation",
    description: "Kick người khác",
    usage: "kick <@tag, id> [lý do]",
    example: "kick @T.H.A",
    run: async(client, message, args) => {
        let serverdata = db.get(message.guild.id)
        if (serverdata.logchannel == null) return message.reply(`Bạn chưa set log channel, vui lòng sử dụng lệnh \`${serverdata.prefix}setlogchannel\` để set log channel.`)
        const logChannel = message.guild.channels.cache.get(serverdata.logchannel);
        if (!logChannel) return message.reply(`Log channel của bạn đã bị xoá, vui lòng kiểm tra lại hoặc sử dụng lệnh \`${serverdata.prefix}setlogchannel\` để set lại log channel.`)

        if (message.deletable) message.delete();

        // No args
        if (!args[0]) return message.reply("Vui lòng tag một người nào đó để kick.").then(m => m.delete({timeout: 5000}));
        let reason = args.slice(1).join(' ')

        // No reason
        if (!args[1]) reason = "Không có lý do."

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Bạn không có quyền để kick người khác.")
                .then(m => m.delete({timeout: 5000}));
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Bot không có quyền kick người khác, vui lòng kiểm tra lại.")
                .then(m => m.delete({timeout: 5000}));
        }

        const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        // No member found
        if (!toKick) {
            return message.reply("Không tìm thấy người cần kick, vui lòng thử lại.")
                .then(m => m.delete({timeout: 5000}));
        }

        // Can't kick urself
        if (toKick.id === message.author.id) {
            return message.reply("Bạn không thể tự kick chính mình.")
                .then(m => m.delete({timeout: 5000}));
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            return message.reply("Mình không thể kick người này vì người này role cao hơn mình.")
                .then(m => m.delete({timeout: 5000}));
        }

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.avatarURL())
            .setFooter(message.member.displayName, message.author.avatarURL())
            .setTimestamp()
            .setDescription(stripIndents `**- Đã kick:** ${toKick} (${toKick.id})
            **- Người kick:** ${message.member} (${message.member.id})
            **- Lý do:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Hãy trả lời trong 30s.`)
            .setDescription(`Bạn có muốn kick ${toKick}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                msg.delete();
                toKick.send(`Bạn vừa bị kick ra khỏi server \`${toKick.guild.name}\`. Lý do: \`${args.slice(1).join(' ')}\``)
                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Bị lỗi khi kick: ${err.message}`)
                    });
                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();
                message.reply(`Đã huỷ kick.`)
                    .then(m => m.delete({timeout: 10000}));
            }
        });
    }
};
