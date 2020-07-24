const { MessageEmbed } = require('discord.js');
const cmtag = require('common-tags');
module.exports = {
    name: "links",
    aliases: ["link", "invite"],
    category: "ℹ️info",
    description: "Links ",
    usage: "links",
    run: (client, message, args) => {
        const embed = new MessageEmbed()
            .setAuthor('Owner bot: `Duck#0685`')
            .setTitle('Các link của SerLight!')
            .setColor('RANDOM')
            .setDescription(cmtag.stripIndent `[Add AgentBot vào server:](https://discordapp.com/api/oauth2/authorize?client_id=702044721429872711&permissions=8&scope=bot)
        
        [Support server:](https://discord.gg/2UdTb9e)

        [Top.gg:](https://top.gg/bot/702044721429872711)

        [Upvote:](https://top.gg/bot/702044721429872711)

        [Discord.bots.gg:](https://discord.bots.gg/bots/702044721429872711)

        `)
        message.channel.send(embed)
    }
}
