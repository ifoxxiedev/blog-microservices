const express = require('express')
const crypto = require('crypto')
const cors = require('cors')
const { posts } = require('./data')

const port = 4002
const host = '0.0.0.0'
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors((origin, cb) => cb(null, origin)))


module.exports = () => {
    app.get('/posts', getAllPosts)

    function getAllPosts(Req, Res, Next) {
        const mapPosts = () => {
            const values = [...Object.values(posts)]
            values.forEach(post => {
                post.comments.forEach(comment => {
                    if (comment.status === 'pending') {
                        comment.content = 'Seu comentário está em análise'
                    }

                    if (comment.status === 'rejected') {
                        comment.content = 'Seu comentário foi rejeitado'
                    }
                })
            })

            return values
        }

        Res.status(200).json({ posts: mapPosts() })
    }

    app.listen(port, () => {
        console.log(`Query microservice is running on ${port}`)
    })

}