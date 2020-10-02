import io from "socket.io-client";
import {messagesType, userType} from "../Types/Types";

export const api = {
    socket: null as null | SocketIOClient.Socket,
    subscriber(
        initMessagesHandler: (messages: Array<messagesType>, fn: () => void) => void,
        newMessageHandler: (message: messagesType) => void,
        userTypingHandler: (user: userType) => void)
    {
        this.socket?.on ('init-messages-published', initMessagesHandler);
        this.socket?.on ('new-message-sent', newMessageHandler);
        this.socket?.on ('user-typing', userTypingHandler);
    },

    createConnection() {
        console.log('init')
        this.socket = io('https://samurai-chat-back.herokuapp.com');
    },

    destroyConnection() {
        this.socket?.disconnect();
        this.socket = null
    },

    sendName(name: string) {
        this.socket?.emit('client-name-sent', name)
    },

    sendMessage(message: string) {
        this.socket?.emit('client-message-sent', message)
    },

    typeMessage() {
        this.socket?.emit('client-typed')
    }
}