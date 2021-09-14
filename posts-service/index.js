const { NatsConnection } = require('blog-core')
const config = require('./config')
const setupServer = require('./setupServer')

const main = async () => {
    try {
        await NatsConnection.makeConnection(
            config.eventbus.clusterId,
            config.eventbus.clientId,
            config.eventbus.options
        )

        setupServer()
    } catch(err) {
        console.error('Error => ', err)
        process.exit(-1)
    }
}

main()
