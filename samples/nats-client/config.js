const { randomBytes } = require('crypto')

module.exports = {
    eventbus: {
        clusterId: 'eventbus',
        clientId: randomBytes(7).toString('hex'),
        uri: process.env.NODE_ENV !== 'production' ? 'http://localhost:4222' : 'http://eventbus:4222',
        queueGroups: {
            comments: 'comments-group',
            posts: 'posts-group'
        }
    }
}