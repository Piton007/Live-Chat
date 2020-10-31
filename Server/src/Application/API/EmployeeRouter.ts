import {Router} from "express"
import  ChatService  from "../../Domain/Service/ChatService"
import EmployeeService from "../../Domain/Service/EmployeeService"


export  function HttpRouter(employeeService:EmployeeService,chatService:ChatService){
    const router = Router()
  
    router.post("/",async function(req,res,next){
        try {
            const {email,name} = req.body
            const employee = await employeeService.create({name,email})
            res.status(200).send(employee)
        } catch (error) {
            
            next(error)   
        }
        
    })
    router.get("/", async function(req,res){
        res.status(200).send(await employeeService.getAll())
    }) 
    router.post("/login", async function(req,res,next){
        try {
            const {email} = req.body
            const employee = await employeeService.findByEmail(email)
            const chats = await chatService.findChatsByEmployee(employee.id)
            res.status(200).send({chats,info:employee})
        } catch (error) {
            next(error)
        }
        
    })   
    return router
}
