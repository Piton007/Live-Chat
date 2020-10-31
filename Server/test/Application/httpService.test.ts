import { mock, MockProxy } from "jest-mock-extended"
const request  = require("supertest")
import App from "../../src/app"
import { EmployeeRespDTO } from "../../src/Application/DTO/employeeDTO"
import Chat from "../../src/Domain/Chat/Entity"
import ChatService from "../../src/Domain/Service/ChatService"
import EmployeeService from "../../src/Domain/Service/EmployeeService"



describe('Employee Endpoints',()=>{
    let app:App
    let chatService:MockProxy<ChatService> & ChatService;
    let employeeService:MockProxy<EmployeeService> & EmployeeService;
    beforeAll(()=>{
        app = new App()
        chatService = mock<ChatService>()
        employeeService = mock<EmployeeService>()
        app.routeEmployee(employeeService,chatService)
    })
    test('Create employee', async()=>{
        const body = {email:'josemowa45321@gmail.com',name:'jose'}
        const expected =   {email:body.email,name:body.name,id:'2'}
        employeeService.create.mockResolvedValueOnce(expected)
        const resp  = await request(app.getApp())
            .post('/employees')
            .send(body)
        expect(resp.status).toEqual(200)
        expect(resp.body).toEqual(expected)
    })
    test('Get all employees', async()=>{
        
        const expected:EmployeeRespDTO[] =   [{email:'correo1@gmail.com',id:'1',name:'Jose'},{email:'correo2@gmail.com',id:'2',name:'Eli'}]
        employeeService.getAll.mockResolvedValueOnce(expected)
        const resp  = await request(app.getApp())
            .get('/employees')
        expect(resp.status).toEqual(200)
        expect(resp.body).toEqual(expected)
    })

    

    test('Recovers all chats by employee', async()=>{
        const chats:Chat[] = [new Chat('chat1','supermans',['jose','fabiola'],[])]
        const employee:EmployeeRespDTO =   {email:'correo1@gmail.com',id:'1',name:'Jose'}
        employeeService.findByEmail.mockResolvedValueOnce(employee)
        chatService.findChatsByEmployee.mockResolvedValueOnce(chats)
        const body = {email:'josemowa45312@gmail.com'}
        
        
        const resp  = await request(app.getApp())
            .post('/employees/login')
            .send(body)
        expect(resp.body.info).toEqual(employee)
        expect(resp.body.chats).toEqual(chats)
    })
})