import Chat from "../Chat/Entity";
import { Message } from "../Chat/Message";

export default interface ChatService {
    addMsg(room:string,msg:Message):Promise<void>
    create(room:string,participants:string[]):Promise<string>
    findChatsByEmployee(employeeId:string):Promise<Chat[]>
}