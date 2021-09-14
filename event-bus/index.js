const express = require('express')
const cors = require('cors')
const axios = require('axios')
const port = 4005
const host = '0.0.0.0'
const app = express();
const events = []

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors((origin, cb) => cb(null, origin)))

app.get('/events', getAllEvents)
app.post('/events', createEvent)

function getAllEvents(Req, Res, Next) {
    Res.status(200).json({ events })
}

function createEvent(Req, Res, Next) {
    const { type, data } = Req.body
    
    const event = { type, data }
    events.push(event)
    
    // -> PostService: 4000 -> [POST event-bus:4005] -> PostService /events
    axios.post('http://localhost:4000/events', event)  // posts

    // -> CommentsService: 4001 -> [POST event-bus:4005] -> CommentsService /events
    axios.post('http://localhost:4001/events', event) // comments

    // -> QueryService: 4002 -> [POST event-bus:4005] -> QueryService /events
    axios.post('http://localhost:4002/events', event) // query
    
    // -> ModerationService: 4003 -> [POST event-bus:4005] -> ModerationService /events
    axios.post('http://localhost:4003/events', event) // moderation

    Res.send('ok')
}

app.listen( port, host, () => {
    console.log(`Events microservice is running on ${port}`)
})

