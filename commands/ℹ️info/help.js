const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const db = require('quick.db');
module.exports = {
    name: "help",
    aliases: ['h', 'giúp', 'giup'],
    category: "ℹ️info",
    description: "Help",
    usage: "help",
    run: async(client, message, args) => {
        let server_prefix = await db.get(`${message.guild.id}.prefix`)
        let embed = new MessageEmbed()
            .setColor("RANDOM") 
            .setAuthor(`Help command`, message.guild.iconURL())
            .setThumbnail(client.user.displayAvatarURL())
        if (!args[0]){
            const categories = readdirSync('./commands/')
            embed.setDescription(`Danh sách lệnh cho bot **${message.guild.me.displayName}**\nTổng lệnh bot có: \`89\` \n Prefix của bot là: \`${server_prefix}\`\nĐể biết thêm thông tin về một lệnh cụ thể, hãy sử dụng sl.help {lệnh}\nCần sự giúp đỡ nhiều hơn? Hãy tham gia [server](https://discord.gg/2UdTb9e) của chúng tôi.`)
            let commandsize = 0;
            categories.forEach(category => {
                const dir = client.commands.filter(c => c.category === category)
                commandsize += parseInt(dir.size);
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(` ${capitalise} [${dir.size} lệnh]:`, dir.map(c => `| \`${c.name}\``).join(' '))
                } catch(e){
                    console.log(e)
                }
            })
            embed.setFooter(`Bot được làm bởi Duck#0685`, 'https://cdn.discordapp.com/avatars/438699147315380224/530c98fc645acdbe3df1ba1f3cbe8467.jpg?size=1024')
            return message.channel.send(embed)
        } else {
            return getCMD(client, message, args[0])
        }
    }
}
function getCMD(client, message, input){
    let server_data = db.get(message.guild.id)
    let embed = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `Không tìm thấy lệnh tên là: **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    if (cmd.name) info = `**Tên lệnh**: \`${server_data.prefix}${cmd.name}\``;
    if (cmd.aliases) info += `\n**Tên rút gọn**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Chi tiết về bot**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Cách sử dụng lệnh**: \`${server_data.prefix}${cmd.usage}\``;
        embed.setFooter(`Cú pháp: <> = bắt buộc, [] = không bắt buộc`);
    }
    if (cmd.note) info += `\n**Note**: ${cmd.note}`;
    if (cmd.example) info += `\n**VD**: \`${server_data.prefix}${cmd.example}\``;

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}
