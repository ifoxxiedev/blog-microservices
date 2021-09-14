const { generateClientId, Protocol } = require('blog-core')

module.exports = {
    eventbus: {
        clusterId: 'eventbus',
        clientId: generateClientId(),
        options: {
            host: process.env.NODE_ENV !== 'production' ? 'localhost' : 'eventbus',
            port: 4222,
            protocol: Protocol.HTTP
        }
    }
}