const fetch = require('node-fetch');
global.fetch = fetch;
const {MessageEmbed} = require('discord.js')
const {unsplashapikey} = require('../../config.json')
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const unsplash = new Unsplash({ accessKey: unsplashapikey });

module.exports = {
    name: "otter",
    category: "🐻động vật",
    description: "Gởi ảnh của rái cá :D",
    run: async (client, message, args) => {
        unsplash.photos.getRandomPhoto({ query: "otter", count: "1"})
            .then(toJson)
            .then(json => {
                json = json[0]
                let embed = new MessageEmbed()
                    .setTitle('Click vào để Download')
                    .setURL(json.links.download)
                    .setImage(json.urls.full)
                    .setFooter(`Photo by ${json.user.name} on Unplash`)
                message.channel.send(embed)
            });
    }
}
