const { send } = require('process')
const socketIOClient = require('socket.io-client')
const serverURL = 'http://localhost:3000'
const socket = socketIOClient(serverURL)

socket.on('connect', () => {
     console.log('connected to server')
     console.log('enter the numbers')
     sendMessage()

})


socket.on('messageFromServer', (message) => {
    console.log(message)

})

async function sendMessage(){
    return new Promise((resolve)=>{ 
    const readline = require('readline').createInterface({
        input: process.stdin,
    })
    readline.question('Enter the numbers to add: ', (numbers) => {
        
        const numArray = numbers.split(' ')
        if(numbers === 'exit'){
            readline.close()
            socket.disconnect()
            resolve()
            return
        }
        if(numArray.length !== 2 || isNaN(numArray[0]) || isNaN(numArray[1])){
            console.log('Invalid input')
            readline.close()
            sendMessage()
            resolve()
            return
        }
        const a = parseInt(numArray[0])
        const b = parseInt(numArray[1])
        socket.emit('messageFromClient', a, b)
        sendMessage()
        resolve()
        })
})
}

socket.on('disconnect', () => {
    console.log('disconnected from server')
})