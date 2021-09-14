const { CommentModeratedSubscriber } = require('./events/CommentModeratedSubscriber')

module.exports = stan => {
    new CommentModeratedSubscriber(stan).subscribe()
}