const express = require('express')
const crypto = require('crypto')
const cors = require('cors')
const { commentedPosts } = require('./data')
const { CommentCreatedPublisher, NatsConnection }  = require('blog-core')

const port = 4001
const host = '0.0.0.0'
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors((origin, cb) => cb(null, origin)))



module.exports = () => {

    app.get('/post/:id/comments', getCommentsForPost)
    app.post('/post/:id/comments', createCommentForPost)
    
    function getCommentsForPost(Req, Res, Next) {
        const { id } = Req.params
        const comments = commentedPosts[id] || []
    
        Res.status(200).json({
            comments
        })
    
    }
    
    async function createCommentForPost(Req, Res, Next) {
        const { id } = Req.params
        const { content } = Req.body
    
        const comments = commentedPosts[id] || []
    
        const comment = {
            id: crypto.randomBytes(14).toString('hex'),
            content,
            postId: id,
            status: 'pending'
        }
        
        await new CommentCreatedPublisher(
            NatsConnection.client
        ).publish(comment)

        comments.push(comment)
        commentedPosts[id] = comments
    
        Res.status(201).json({ comment })
    }

    
    app.listen(port, () => {
        console.log(`Comments microservice is running on ${port}`)
    })
}