import socketIOClient from "socket.io-client"

export function init(endpoint:string):SocketIOClient.Socket{
    return socketIOClient(endpoint)
}   