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
Setup application
*/
async function main() {
    try {
        const stan = await getNatsConnection()
    } catch(err) {
        console.error(err)
        process.exit(-1)
    }
}


main()