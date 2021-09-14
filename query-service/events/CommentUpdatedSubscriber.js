const { AbstractSubscriber, Subjects, CommentUpdatedPublisher, NatsConnection } = require('blog-core');
const { posts } = require('../data')

exports.CommentUpdatedSubscriber = class extends AbstractSubscriber {
    constructor(client, options) {
        super(client, options)
        this.subject = Subjects.COMMENT_UPDATED
        this.queueGroupName = 'query-service'
    }

    async onMessage(data) {
        const post = posts[data.postId]
        if (post) {
            const comments = post.comments
            if (comments) {
                const idx = comments.findIndex(c => c.id === data.id)
                if (idx !== -1) {
                    post.comments[idx].status = data.status
                }
            }
        }
    }
}
