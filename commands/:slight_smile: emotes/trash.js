const Canvacord = require('canvacord');
const canva = new Canvacord();
const {MessageAttachment} = require('discord.js')
module.exports = {
    name: "trash",
    category: ":slight_smile: emotes",
    description: "Bỏ vào thùng rác",
    usage: "trash [@tag]",
    example: "trash @Duck",
    run: async (client, message, args) => {
        let nguoitag = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        let avaurl = nguoitag.user.avatarURL({format: 'png', dynamic: false})
        let image = await canva.trash(avaurl)
        let attach = new MessageAttachment(image, 'trash.png')
        return message.channel.send(attach)
    }
}
