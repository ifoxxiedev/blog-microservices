const { CommentCreatedSubscriber } = require('./events/CommentCreatedSubscriber')

module.exports = stan => {
    new CommentCreatedSubscriber(stan).subscribe()
    // ...
}