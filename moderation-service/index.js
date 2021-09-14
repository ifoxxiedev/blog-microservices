const { NatsConnection } = require('blog-core')
const config = require('./config')
const setupServer = require('./setupServer')
const setupSubscribers = require('./setupSubscribers')

const main = async () => {
    try {
        const { clusterId, clientId, options } = config.eventbus
        await NatsConnection.makeConnection(clusterId,clientId,options)
        
        setupSubscribers(NatsConnection.client)
        setupServer()
    } catch(err) {
        console.error('Error => ', err)
        process.exit(-1)
    }
}

main()
