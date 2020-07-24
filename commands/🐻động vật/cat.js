var getJSON = require("get-json")
const { MessageEmbed } = require("discord.js")
module.exports = {
    name: "cat",
    category: "🐻động vật",
    description: "Gởi ảnh/video về moè",
    run: (client, message, args) => {
        let url = `http://aws.random.cat/meow`
        getJSON(url, function(error, response) {
            if (!error) {
                const embed = new MessageEmbed()
                    .setTitle(`Moèeeeee!`)
                    .setURL(response.file)
                    .setImage(response.file)
                message.channel.send(embed)
            } else {
                message.channel.send(`Bot lỗi trong khi lấy hình, vui lòng thử lại sau.`)
            }

        });
    }
}
