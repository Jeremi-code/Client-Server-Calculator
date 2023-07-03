const { send } = require('process')
const socketIOClient = require('socket.io-client')
const serverURL = 'http://localhost:3000'
const socket = socketIOClient(serverURL)
socket.on('connect', () => {
    console.log('connected to server')
    socket.emit('message', 'Hello from client')
    sendMessage()
})
socket.on('messageFromServer', (message) => {
    console.log(message)
    sendMessage()
})

function sendMessage(){
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    })
    readline.question('Enter the numbers to add: ', (numbers) => {
        const numArray = numbers.split(' ')
        if(numArray.length !== 2 || isNaN(numArray[0]) || isNaN(numArray[1])){
            console.log('Invalid input')
            readline.close()
            sendMessage()
        }
        const a = parseInt(numArray[0])
        const b = parseInt(numArray[1])
        socket.emit('messageFromClient', a, b)
})
}

socket.on('disconnect', () => {
    console.log('disconnected from server')
})