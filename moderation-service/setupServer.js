const express = require('express')
const cors = require('cors')
const axios = require('axios')

const port = 4003
const host = '0.0.0.0'
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors((origin, cb) => cb(null, origin)))


module.exports = () => {
    app.listen(port, () => {
        console.log(`Moderation microservice is running on ${port}`)
    })
}