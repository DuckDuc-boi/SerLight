var getJSON = require("get-json")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "koala",
    category: "🐻động vật",
    description: "Gởi ảnh của koala ",
    run: async(client, message, args) => {
        let url = `https://some-random-api.ml/img/koala`
        getJSON(url, function(error, response) {
            if (error) return message.channel.send('Bot lỗi, vui lòng thử lại sau!')
            const embed = new MessageEmbed()
                .setTitle(`Koalaaaa`)
                .setURL(response.link)
                .setImage(response.link)
                .setFooter(`Click the title to view/download`)
            message.channel.send(embed)
        });

    }
}
