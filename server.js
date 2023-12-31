const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket)=> {
    // console.log('new user connected')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
        // socket.broadcast.emit('list', msg.user);
    })

    // socket.on("newuser",function (name){
    //     socket.broadcast.emit('list', name + "joined in the chat")
    // })
    })