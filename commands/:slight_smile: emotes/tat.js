const Canvacord = require('canvacord');
const canva = new Canvacord();
const {MessageAttachment} = require('discord.js')
module.exports = {
    name: "tat",
    aliases: ["tats", "tát"],
    category: ":slight_smile: emotes",
    description: "Tát (batslap)",
    usage: "tat [@tag]",
    example: "tat @Duck",
    run: async (client, message, args) => {
        let url1 = message.author.avatarURL({format: 'png', dynamic: false})
        let nguoitag = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let avaurl = nguoitag.user.avatarURL({format: 'png', dynamic: false})
        let image = await canva.batslap(url1,avaurl)
        let attach = new MessageAttachment(image, 'batslap.png')
        return message.channel.send(attach)
    }
}
