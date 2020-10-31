import Socket from "socket.io"
import cors from "cors"
import express,{Express} from "express"
import {createServer, Server}  from "http"
import EmployeeService from "./Domain/Service/EmployeeService"
import  ChatService  from "./Domain/Service/ChatService"
import { HttpRouter } from "./Application/API/EmployeeRouter"
import ErrorHandler from "./Application/API/ErrorHandler"
import { SocketIOAdapter } from "./Shared/WSAdapter"
import ChatSocketIOHandler from "./Application/API/ChatWS"

export default class App {
    private readonly app:Express
    private http?:Server 
    constructor(){
        this.app = express()
        this.app.use(cors({ origin: "*", credentials: true }))
        this.app.use(express.json())
        
 
    }
    routeEmployee(employeeService:EmployeeService,chatService:ChatService){
        this.app.use('/employees',HttpRouter(employeeService,chatService))
        this.app.use(ErrorHandler )
        return this
    }

    attachWS(employeeService:EmployeeService,chatService:ChatService){
        this.http = createServer(this.app)
        const io = Socket(this.http)
        const adapter = new SocketIOAdapter(io)
        new ChatSocketIOHandler(employeeService,chatService,adapter).init()
        return this
    }



    getApp(){
        return this.app
    }

    listen(port:string){
        this.http!.listen(port,()=>{
            console.log('Listening On '+port)
        })
    }
}