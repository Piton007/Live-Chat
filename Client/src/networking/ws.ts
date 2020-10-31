
import React from "react"
import WS from "socket.io-client"

let s:SocketHandler 

export function getSocketConnection():SocketHandler{
    return s 
}

export function init(url:string):SocketHandler{
    const socket = WS.connect(url,{forceNew:true,
        reconnection:false,
        transports: ['websocket']})
     s = new SocketHandler(socket)
     return s        
    }
    


interface MsgDTO {
    room:string,
    description:string,
    releaseDate:string,
    author:string
}

export interface CreateRoomDTO {
    name:string,
    participants:string[]
}


const SEND = 'send_msg'
const NEW_CHAT = 'new_chat'
const NEW_FOREIGN_MSG = 'print_foreign_msg'


export class SocketHandler
{
    private s?:SocketIOClient.Socket

    constructor(s:SocketIOClient.Socket){
        this.s = s
    }

    getConnectionId(){
        return this.s?.id
    }

    join(roomId:string){
        this.s?.emit('join',roomId)
    }

    disconnect(){
        this.s?.disconnect()
    }
    sendMsg(payload:MsgDTO){
       
        this.s?.emit(SEND,payload)
    }
    listenToNewChat(observer:(room:CreateRoomDTO)=>void){
        this.s?.on(NEW_CHAT,observer)
    }
    listenToForeignMsg(observer:(msg:MsgDTO)=>void){
        this.s?.on(NEW_FOREIGN_MSG,observer)
    }
}
