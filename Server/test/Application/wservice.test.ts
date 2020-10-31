import WSClient from "socket.io-client"
import http from "http"
import ChatService from "../../src/Domain/Service/ChatService"
import EmployeeService from "../../src/Domain/Service/EmployeeService"
import WSService from "../../src/Application/API/ChatWS"
import WSServe from "socket.io"
import { mock, MockProxy } from "jest-mock-extended"
import Employee from "../../src/Domain/Employee/Entity"
import { AddressInfo } from "net"
import { SocketIOAdapter } from "../../src/Shared/WSAdapter"
import { CreateRoomDTO, MsgDTO } from "../../src/Application/DTO/ChatDTO"

const PORT_TEST = 8089


let httpServer:http.Server;
let httpServerAddr: AddressInfo | string | null;
let ioServer:WSServe.Server;
let chatService:MockProxy<ChatService> & ChatService;
let employeeService:MockProxy<EmployeeService> & EmployeeService

describe('Testing WS Services', () => {
  beforeAll(async (done) => {
    httpServer = await  http.createServer().listen(PORT_TEST);
  
    httpServerAddr = await httpServer.address();
    ioServer = WSServe(httpServer);
    const adapter= new SocketIOAdapter(ioServer)
    chatService =  mock<ChatService>()
    employeeService = mock<EmployeeService>()
    new WSService(employeeService,chatService,adapter).init()
    done();
  });
  
  
  afterAll((done) => {
    ioServer.close();
    httpServer.close();
    done();
  });
  test('should creates a new room', async () => {
    expect.assertions(1);
    const new_room = 'room0001'
    chatService.addMsg.mockReset()
    chatService.create.mockResolvedValueOnce(new_room )
    const room = <CreateRoomDTO>{name:new_room ,participants:['Jose','Eli','Fabiola','Pedro']}
    return  new Promise<{}>((res, rej) => {

      socketClient().then((client) => {
        employeeService.findByIds.mockResolvedValueOnce([new Employee('1', 'test@test.com', 'JoseTest', client.id)])
        client.emit('create', room)
        client.on('new_chat', (response: CreateRoomDTO) => {
          client.emit('join', response.name)
          client.disconnect()
        })
      })

      ioServer.on('connection', (s: SocketIO.Socket) => {
        s.on('join', function (r: CreateRoomDTO) {
          
            res(ioServer.sockets.adapter.rooms)
          
        })
      })
    }).then((r:any)=>{expect(r).toHaveProperty(new_room)})
    
  });
  test('all participants in the same room should receives the new message',  async () => {
    expect.assertions(2)
    chatService.addMsg.mockResolvedValue()  
    
    const red_msg:MsgDTO  = {room:'red',author:'Eli',description:'Hello World, Red Group ',releaseDate:new Date(2020,10,29).toLocaleDateString()}
    const blue_msg:MsgDTO  = {room:'blue',author:'Jose',description:'Hello World, Blue Group',releaseDate:new Date(2020,10,29).toLocaleDateString()}
    const sockets = await initSocketsByGroup()
    sockets[0].emit('send_msg',red_msg)
    
    sockets[2].emit('send_msg',blue_msg)
    return Promise.all([expectMsgFromGroup(sockets[3]),expectMsgFromGroup(sockets[1])])
            .then((msgs:MsgDTO[])=>{
              sockets.forEach(x=>{x.disconnect()})
              expect(msgs[0]).toEqual(blue_msg)
              expect(msgs[1]).toEqual(red_msg)
            })
   
  });
  
  
  

  
});

function expectMsgFromGroup(client:SocketIOClient.Socket){
  return new Promise<MsgDTO>((res,rej)=>{
    client.on('print_foreign_msg',(msg:MsgDTO)=>{
      
      res(msg)
      
    })
  })
}

async function initSocketsByGroup(){
  const REDS = 2
  const BLUES = 2
  const redSockets:Promise<SocketIOClient.Socket>[] = []
  const blueSockets:Promise<SocketIOClient.Socket>[] = []
  for (let index = 0; index < REDS; index++) {
      redSockets.push(socketClientInRoom('red'))
    
  } 
  for (let index = 0; index < BLUES; index++) {
    blueSockets.push(socketClientInRoom('blue'))
  
} 

  

  return Promise.all(redSockets.concat(blueSockets))
}

function socketClientInRoom(room:string):Promise<SocketIOClient.Socket>{
  return new Promise((res,rej)=>{
  let socket = WSClient.connect(`http://localhost:${(httpServerAddr as AddressInfo).port }`, {
    
    forceNew:true,
    reconnection:false,
    transports: ['websocket'],
  })
  ioServer.on('connection',(s)=>{
    s.on('join',()=>{
      setTimeout(()=>{res(socket)},200)
      
    })
  })
  socket.emit('join',room)
  
  
})
}

const socketClient = ():Promise<SocketIOClient.Socket>=>new Promise((res,rej)=>{
  const socket = WSClient.connect(`http://localhost:${(httpServerAddr as AddressInfo).port }`, {
    'reconnectionDelay':0,
    forceNew:true,
    transports: ['websocket'],
  })
  socket.on('connect', () => {
    res(socket)
  });
  
})