import { Server as WS } from "socket.io";





type Callback = (...args:any[])=>void

export interface WSHandler {
    join(room:string):void
    publishMultiCast(roomId:string,event:string,payload:any):void,
    publishUnicast(event:string,payload:any):void,
    suscribe(event:string,callback:Callback):void
} 

export class SocketIOAdapter  implements WSHandler{
    private readonly socket:WS

    constructor(server:WS){
        this.socket = server
        this.join()
    }
  
    publishMultiCast(roomId: string, event: string, payload: any): void {
        this.socket.to(roomId).emit(event,payload)
      
            
    }
    publishUnicast(event: string, payload: any): void {
        this.socket.emit(event,payload)
        
    }

    join = ()=>{
        
        this.socket.on('connection',(socket)=>{
              
            socket.on('join',(room:string)=>{
                socket.join(room)
            })
        })
    }

    suscribe(event: string, callback: Callback): void {
        this.socket.on("connection",(socket)=>{
            socket.on(event,callback)
        })
    }

}