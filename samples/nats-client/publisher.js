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

/*
Publish message on Nats
*/
function publishMessage(stan, eventType, eventData) {
    const eventDataSerialized = JSON.stringify(
        typeof eventData === 'object' ? 
        eventData : eventData ? eventData : {})

    stan.publish(
        eventType,
        eventDataSerialized,
        (err) => {
            if (err) {
                console.error('Error to publish message ', err)
                return
            }

            console.info(`Event ${eventType} published!`)
        }
    )
}

/*
Setup application
*/
async function main() {
    try {
        const stan = await getNatsConnection()
        setInterval(() => {
            publishMessage(stan, 'POST:CREATED', {
                title: 'Primeiro post!',
                timestamp: Date.now() 
            })
        }, 3000)
    } catch(err) {
        console.error(err)
        process.exit(-1)
    }
}


main()