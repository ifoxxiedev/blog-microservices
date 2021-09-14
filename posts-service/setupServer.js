const express = require('express')
const crypto = require('crypto')
const cors = require('cors')

const { PostCreatedPublisher, NatsConnection } = require('blog-core')

const posts = {}
const port = 4000
const host = '0.0.0.0'
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors((origin, cb) => cb(null, origin)))


module.exports = () => {
    app.get('/posts', getPosts)
    app.post('/posts', createPost)
    
    function getPosts(Req, Res, Next) {
        Res.status(200).json({
            posts: Object.values(posts)
        })
    }

    async function createPost(Req, Res, Next) {
        const post = {
            id: crypto.randomBytes(14).toString('hex'),
            title: Req.body.title
        }
        // Save on database
        posts[post.id] = { ...post }

        // Publicando no broker
        await new PostCreatedPublisher(NatsConnection.client).publish(post)
        Res.status(201).json({ post })
    }


    app.listen(port, () => {
        console.log(`Posts microservice is running on ${port}`)
    })    
}