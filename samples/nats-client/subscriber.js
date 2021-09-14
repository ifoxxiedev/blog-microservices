const nats = require('node-nats-streaming')
const config = require('./config')

let natsConnection;
/*
Get connection from Nats Streaming
*/
function getNatsConnection() {
    const { clientId, clusterId, uri } = config.eventbus
    
    return new Promise((resolve, reject) => {
        if (natsConnection) return resolve(natsConnection)
        
        const stan = nats.connect(clusterId, clientId, { url: uri })
        natsConnection = stan

        stan.on('connect', () => resolve(natsConnection))
        stan.on('error', reject)
    })

}


function getSubscriptionOptions(stan, queueGroupName) {
    return stan.subscriptionOptions()
        .setDeliverAllAvailable() // Sempre entrege todas as mensagens
        .setManualAckMode(true) // EU tirar da fila a mensgaem deve ser manual e não auto matica
        .setAckWait(2000) // Tempo de espera para retirada da mensagem da fila
        .setStartWithLastReceived() // Sempre com a ultima mensagem recebida
        .setDurableName(queueGroupName)
}


function subscribeMessage(stan, queueGroupName, eventType, subHandler) {
    const subscriber = stan.subscribe(
        eventType,
        queueGroupName,
        getSubscriptionOptions(stan, queueGroupName)
    )

    subscriber.on('message', msg => {
        console.log(`Received message from ${eventType} [${msg.getSequence()}]`)
        const data = msg.getData()
        const parsedData = JSON.parse(typeof data === 'string' ? data : data.toString('utf-8'))

        subHandler(parsedData, {
            msg
        })
    })
}

/*
Setup application
*/
async function main() {
    try {
        const stan = await getNatsConnection()
        const queueGroupName = config.eventbus.queueGroups.comments
        subscribeMessage(
            stan,
            queueGroupName,
            'POST:CREATED',
            (data, ctx) => {
                try {
                    console.log(data)

                    /// Acknowleadgment
                    ctx.msg.ack()

                } catch(err) {

                }
            }
        )

    } catch(err) {
        console.error(err)
        process.exit(-1)
    }
}


main()