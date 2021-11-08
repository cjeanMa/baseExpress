
class Message{
    constructor(uid, name, msg){
        this.id = uid;
        this.name = name;
        this.message = msg;
    }
}

class ChatMessage{
    constructor(){
        this.message = [];
        this.users={};
    }

    get last10(){
        return this.message.slice(0,10);
    }

    get userArr(){
        return Object.values ( this.users );
    }

    sendMessage(uid, name, msg){
        this.message.unshift(
            new Message(uid, name, msg)
        )
    }

    connectUser( user ){
        this.users[user.id] = user;
    }

    disconnectUser(id){
        delete this.users[id];
    }
}

module.exports = ChatMessage;