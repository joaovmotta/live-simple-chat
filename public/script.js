var socket = io('http://localhost:3000');

function renderMessage(message){
    $('.msgs').append('<div class="message"><strong>'+ message.user +': </strong>'+ message.message +'</div>')
}

socket.on('previousMessage', (messages) => {
    for(message of messages){
        renderMessage(message);
    }
})

socket.on('receivedMessage', (message) => {
    renderMessage(message);
})

$("#chat").submit((event) => {
    event.preventDefault();

    var username = $('input[name=username').val();
    var message = $('input[name=message').val();

    if(username.length && message.length){

        let messageObject = {
            user: username,
            message: message
        }

        socket.emit('newMessage', messageObject);
        renderMessage(messageObject);
    }
})