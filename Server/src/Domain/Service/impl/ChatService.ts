import Chat from "../../Chat/Entity";
import { ChatRepository } from "../../Chat/Repository";
import CS from "../ChatService"
import {v4} from "uuid"
import { Message } from "../../Chat/Message";


export class ChatService implements CS {
    private readonly repository:ChatRepository
    constructor(repository:ChatRepository){
        this.repository = repository
    }
    findChatsByEmployee(employeeId: string): Promise<Chat[]> {
        return this.repository.findAllByEmployee(employeeId)
    }
    async addMsg(room: string, msg: Message): Promise<void> {

        const chat = await this.repository.findByIdOrNull(room)
        if (chat){
            chat.addMessage(msg)
            await this.repository.save(chat)
               
        }
        
    }
    async create(room: string, participants: string[]): Promise<string> {
        const chat = new Chat(v4(),room,participants,[])
        await this.repository.create(chat)
        return chat.id
    }
    
    
   
    
}