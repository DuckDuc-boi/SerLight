module.exports = {
    name: "ping",
    category: "ℹ️info",
    description: "Returns latency and API ping",
    usage: "ping",
    run: async(client, message, args) => {
            message.channel.send('🏓 Pong').then(m => m.edit('`Độ trễ là: '+ `${m.createdTimestamp - message.createdTimestamp}`+'ms`' +' | ' +'`Web Socket: ' +`${Math.round(client.ws.ping)}` +'ms`'))
    }
}
