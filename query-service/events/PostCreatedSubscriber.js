const { AbstractSubscriber, Subjects } = require('blog-core');
const { posts } = require('../data')

exports.PostCreatedSubscriber = class extends AbstractSubscriber {
    constructor(client, options) {
        super(client, options)
        this.subject = Subjects.POST_CREATED
        this.queueGroupName = 'query-service'
    }

    onMessage(data) {
        posts[data.id] = { ...data, comments: [] }
        return Promise.resolve()
    }
}