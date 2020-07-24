var getJSON = require("get-json")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "dog",
    category: "🐻động vật",
    description: "Gởi ảnh/video về cún",
    run: (client, message, args) => {
        let url = `https://random.dog/woof.json`
        getJSON(url, function(error, response) {
            if (error) return message.channel.send('Bot lỗi, vui lòng thử lại sau!')
            const embed = new MessageEmbed()
                .setTitle(`Dogs <3`)
                .setURL(response.url)
                .setImage(response.url)
            message.channel.send(embed)
        });

    }
}
