const db = require('quick.db');
module.exports = {
    name: "clear",
    aliases: ["purge"],
    category: "🔧moderation",
    description: "Xoá tin nhắn",
    usage: "clear [@tag] <số tin nhắn>",
    example: "clear @T.H.A 10",
    run: async(client, message, args) => {
        await message.delete();
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Bạn không có quyền MANAGE_MESSAGES").then(m => m.delete({timeout: 5000}));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Bot không có quyền MANAGE_MESSAGES nên bot không thể xoá.").then(m => m.delete({timeout: 5000}));
        }

        const user = message.mentions.users.first()
        const ammount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1])
        if (!ammount) return message.reply('Vui lòng nhập số lượng tin nhắn để xoá.')
        if (ammount < 1) return message.reply('Vui lòng nhập số lớn hơn 1.')
        if (ammount > 100) return message.reply('Vui lòng nhập số nhỏ hơn 100.')
        if (!ammount && !user) return message.channel.send(`Sử dụng lệnh \`${db.get(`${message.guild.id}.prefix`)}help clear\` để biết thêm thông tin.`)
        if (!user) {
            message.channel.bulkDelete(ammount, true).then(delmsg => {
                message.channel.send(`Đã xoá \`${delmsg.size}\` tin nhắn!`).then(m => m.delete({timeout: 5000}))
            })
        } else {
            message.channel.messages.fetch({
                limit: 100,
            }).then(messages => {
                messages = messages.filter(m => m.author.id === user.id).array().slice(0, ammount)
                message.channel.bulkDelete(messages, true).then(delmsg => {
                    message.channel.send(`Đã xoá \`${delmsg.size}\` tin nhắn!`).then(m => m.delete({timeout: 5000}))
                })
            }) 
        }
        
    }

}
