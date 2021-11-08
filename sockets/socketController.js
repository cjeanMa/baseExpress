
const { Socket } = require("socket.io");
const { verifyJWT } = require("../helpers");
const { ChatMessage } = require("../models");

const chatMessage = new ChatMessage()

const socketController = async (socket = new Socket(), io) =>{
    
    const token = socket.handshake.headers["j-token"];

    const user = await verifyJWT(token);
    if(!user){
        return socket.disconnect();
    }

    chatMessage.connectUser(user);
    io.emit("ver-usuarios", chatMessage.userArr)
    socket.emit("chat-container", chatMessage.last10);

    socket.on("send-message", (payload)=>{
        chatMessage.sendMessage(user.id, user.name, payload);
        io.emit("chat-container", chatMessage.last10);
    })
    
    socket.on("disconnect", ()=>{
        chatMessage.disconnectUser(user.id);
        socket.broadcast.emit("ver-usuarios", chatMessage.userArr)
    })

}   

module.exports = {
    socketController
}