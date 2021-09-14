const { AbstractSubscriber, Subjects } = require('blog-core');
const { posts } = require('../data')

exports.CommentCreatedSubscriber = class extends AbstractSubscriber {
    constructor(client, options) {
        super(client, options)
        this.subject = Subjects.COMMENT_CREATED
        this.queueGroupName = 'query-service'
    }

    onMessage(data) {
        const post = posts[data.postId]
        if (post) {
            post.comments.push(data)
        }
    }
}