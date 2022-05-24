const express = require('express')
const path = require('path')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

// View Engine
app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))
app.use(express.urlencoded({ extended: true }))

const users = {}

io.on('connection', (socket) => {
  socket.on('new-user', (name) => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', (message) => {
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id],
    })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

// Port Listener
http.listen(PORT, () => console.log(`Listening on http://[::]:${PORT}`))
