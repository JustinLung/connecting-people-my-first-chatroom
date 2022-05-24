let socket = io()
let messageContainer = document.querySelector('ul')
let messageForm = document.querySelector('form')
let input = document.querySelector('input')
let message = document.querySelector('li')

let name = prompt('What is your name?')
appendMessage('You Joined')

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  let message = input.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  input.value = ''
})

socket.emit('new-user', name)

socket.on('chat-message', (data) => {
  receivedMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', (name) => {
  appendMessage(`${name} has connected`)
})

socket.on('user-disconnected', (data) => {
  appendMessage(`${name} has disconnected`)
})

function appendMessage(message) {
  let messageEl = document.createElement('li')
  messageEl.classList.add('sent')
  messageEl.innerText = message
  messageContainer.append(messageEl)
}

function receivedMessage(message) {
  let receivedMessageEl = document.createElement('li')
  receivedMessageEl.classList.add('received')
  receivedMessageEl.innerText = message
  messageContainer.append(receivedMessageEl)
}
