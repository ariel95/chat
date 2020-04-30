var users = require('./const/users');

module.exports = function socket(io){
    io.on('connection', (socket) => {
        console.log("Nuevo usuario conectado");
        addUser(socket);
        disconnectUser(socket);
        newMessage(socket);
    }) 
}
function addUser(socket){
    socket.on('username',(data) => {
        console.log("Usuario: " + data.username + " - SocketId: " + socket.id);
        socket.username = data.username;
        users.push({
            id: socket.id,
            username: data.username
        });
        let cont = 0;
        console.log("Usuarios conectados: ");
        users.forEach(element => {
            cont++;
            console.log(cont + ") " + element.username);
        });
        updateUsers(socket);

    })
}

function updateUsers(socket){
    socket.emit('updateUsers',{ users });
    socket.broadcast.emit('updateUsers',{users})
}

function disconnectUser(socket){
    socket.on('disconnect',() => { //Se ejecuta automaticamente cuando se cierra la pagina
        let username = socket.username;
        if(username){
            users.splice(users.indexOf(username),1);
        }
        updateUsers(socket);
    })
}

function newMessage(socket){
    socket.on('message',(data) => {
        socket.emit('updateMessage',data);
        socket.broadcast.emit('updateMessage',data);
    })
}



// //VER
// io.on('connection', (client) => {
//   let token = client.handshake.query.username;
//   users.push({
//     id: client.id,
//     name: token
//   });
//   users.forEach(element => {
//     console.log("Usuarios conectados: " + element.id + " - " + element.name);  
//   });
  
//   //Events
//   client.on('disconnect', () => {
//     var clientid = client.id;
//     for (var i = 0; i < users.length; i++)
//       if (users[i].id && users[i].id == clientid) {
//         users.splice(i, 1);
//         break;
//       }
//   });
  
//   client.on('typing', (data) => {
//     io.emit("typing", data)
//   });

//   client.on('stoptyping', (data) => {
//     io.emit("stoptyping", data)
//   });

//   client.on('message', (data) => {
//     io.emit("message", data)
//   });

//   io.emit("newuser", {
//     id: client.id,
//     name: token
//   })
// });