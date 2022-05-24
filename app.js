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

io.on('connection', (socket) => {
  console.log('User has been connected.')

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('User ')
  })
})

// Routes
app.get('/', (req, res) => {
  res.render('index')
})

// Port Listener
http.listen(PORT, () => console.log(`Listening on http://[::]:${PORT}`))
