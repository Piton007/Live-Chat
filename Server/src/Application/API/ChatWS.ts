import { WSHandler } from "../../Shared/WSAdapter";
import EmployeeService from "../../Domain/Service/EmployeeService";
import  ChatService  from "../../Domain/Service/ChatService";
import { CreateRoomDTO, MsgDTO } from "../DTO/ChatDTO";


export interface ChatWSHandler{
    init():void
    sendMsg():void
    create():void
}




const SEND_MSG = "send_msg"
const CREATE = "create" 
const RESEND_MSG = 'print_foreign_msg'
const RESEND_CREATE  = 'new_chat'


export default class ChatSocketIOHandler implements  ChatWSHandler{

    private readonly employeeService:EmployeeService
    private readonly chatService:ChatService
    private readonly socket:WSHandler

    constructor(employeeService:EmployeeService,chatService:ChatService,socket:WSHandler){
        this.employeeService = employeeService
        this.chatService = chatService
        this.socket = socket
        
    }

    init(){
        this.sendMsg()
        this.create()
    }

    sendMsg():void{
        let self = this
        this.socket.suscribe(SEND_MSG,(msg:MsgDTO)=>{
            
            self.chatService.addMsg(msg.room,msg).then(()=>{
                
                self.socket.publishMultiCast(msg.room,RESEND_MSG,msg)  
            })
                     
        }) 
    }

    create():void{
        let self = this
        this.socket.suscribe(CREATE,(room:CreateRoomDTO)=>{
            const {name,participants} = room
            Promise.all([self.chatService.create(name,participants),self.employeeService.findByIds(participants)])
                    .then((values)=>{
                        values[1].forEach(x=>{
                            self.socket.publishMultiCast(x.connectionId,RESEND_CREATE,room)
                        })
                    })
                     
        })
    }

}