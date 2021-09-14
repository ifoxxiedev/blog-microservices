const { PostCreatedSubscriber } = require('./events/PostCreatedSubscriber')
const { CommentCreatedSubscriber } = require('./events/CommentCreatedSubscriber')
const { CommentUpdatedSubscriber } = require('./events/CommentUpdatedSubscriber')

module.exports = stan => {
    new PostCreatedSubscriber(stan).subscribe()
    new CommentCreatedSubscriber(stan).subscribe()
    new CommentUpdatedSubscriber(stan).subscribe()
}