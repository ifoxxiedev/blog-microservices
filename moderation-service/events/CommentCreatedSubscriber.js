const { AbstractSubscriber, Subjects, CommentModeratedPublisher, NatsConnection } = require('blog-core')
const { filters } = require('../data')


exports.CommentCreatedSubscriber = class extends  AbstractSubscriber {
    constructor(client, options) {
        super(client, options)

        this.subject = Subjects.COMMENT_CREATED
        this.queueGroupName = 'moderation-service'
    }

    async onMessage(data) {    
        if (data.status === 'pending') {
            const { postId, id, content } = data
    
            const keywords = content.split(" ");
            // Acha no comentário uma plavra inválid (I.A)
            const isRejected = keywords.some(keyword => filters.includes(keyword.toLowerCase()))
            console.log(keywords, isRejected)
    

            // Enviar para um publisher
            const commentPublisher = new CommentModeratedPublisher(NatsConnection.client)

            await commentPublisher.publish({
                id,
                postId,
                content,
                status: isRejected ? 'rejected' : 'accepted'
            })
        }
    }
}