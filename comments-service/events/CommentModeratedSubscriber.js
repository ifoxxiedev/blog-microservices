const { AbstractSubscriber, Subjects, CommentUpdatedPublisher, NatsConnection } = require('blog-core');
const { commentedPosts } = require('../data')

exports.CommentModeratedSubscriber = class extends AbstractSubscriber {
    constructor(client, options) {
        super(client, options)
        this.subject = Subjects.COMMENT_MODERATED
        this.queueGroupName = 'comments-service'
    }

    async onMessage(data) {
        const comments = commentedPosts[data.postId]
        if (comments) {
            const idx = comments.findIndex(comment => comment.id === data.id)
            if (idx !== -1) {
                comments[idx].status = data.status
                const payload = comments[idx]
                await new CommentUpdatedPublisher(NatsConnection.client).publish(payload)
            }
        }
    }
}
