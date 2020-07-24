module.exports = {
    name: "bug",
    category: "🔧moderation",
    description: "chỉ định lỗi",
    note: 'Dùng nếu có lỗi',
    example: "bug sl.help lỗi rồi",
    usage: "bug <lỗi>",
   run: async(client, message, args) => {
    if (!args[0]) return message.reply("Vui lòng chỉ định lỗi. Ví dụ:\n`sl.help bị lỗi rồi. Nó hiện ra các câu lệnh cũ hoặc không hoạt động");
    if (args[0] === "bug") return message.reply("Vui lòng chỉ định lỗi. Ví dụ:\n`sl.help bị lỗi rồi. Nó hiện ra các câu lệnh cũ hoặc không hoạt động`");
    args = args.join(" ");
    message.reply("Cảm ơn bạn đã gửi lỗi! <a:balancecheck:556017659419033653>");
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) đã báo lỗi \n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nTrong server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.cache.get('735058241079214101').send(content)
 }
   }
