const { getMember } = require("../../functions.js");
module.exports = {
    name: "pray",
    category: "🤪fun",
    description: "Cầu nguyện cho bạn bè :DD",
    usage: "pray [mention | id | username]",
    example: "pray @Duck",
    run: async(client, message, args) => {
        if (!args[0]) return message.reply("Cầu nguyện thì phải cần tag nha bạn")
        let person = getMember(message, args[0]);
        if (message.author.id === person.id) return message.reply("Có thờ có thiêng có duyên chết liền. Cầu cho người khác chứ cầu cho mình hoài vậy.");
        message.channel.send(`🙏 ${message.member.displayName} cầu nguyện cho ${person.displayName} \n Chúc bạn may mắn :D`);

    }
}
