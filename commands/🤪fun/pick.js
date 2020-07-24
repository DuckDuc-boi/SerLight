module.exports = {
    name: "pick",
    category: "🤪fun",
    description: "Bot sẽ giúp bạn chọn!",
    usage: "pick <lựa chọn 1, lựa chọn 2, ...>",
    example: "pick chơi game, học bài",
    run: async(client, message, args) => {
        var pick_wordlist = args.join(' ').split(',')
        const random = pick_wordlist[Math.floor(Math.random() * pick_wordlist.length)];
        return message.channel.send(random)
    }
}
