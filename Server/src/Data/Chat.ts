import { Schema, Document, model} from "mongoose"
import Chat from "../Domain/Chat/Entity"
import { ChatRepository } from "../Domain/Chat/Repository"
import {EmployeeModel} from "./Employee" 



export default class ChatMongooseRepository implements ChatRepository {
    async findAllByEmployee(employeeId: string): Promise<Chat[]> {
        let chats:Chat[] = []
        const eDoc = await EmployeeModel.findOne({employeeId:employeeId})
        if (eDoc){
            chats =  (await ChatModel.find({chatId:{$in:eDoc.chats}})).map(x=>restoreEntity(x))
        }
        return chats
    }

    async create(chat:Chat):Promise<void>{
        const doc = new ChatModel(assembleDocument(chat))
        joinParticipants(doc)
        await doc.save()
    }

    async save(chat: Chat): Promise<void> {
        await ChatModel.findOneAndUpdate({chatId:chat.id},{content:chat.content, name:chat.name,participants:chat.participants})
    }

    async findByIdOrNull(id: string): Promise<Chat|null> {
        const doc = await ChatModel.findOne({chatId:id})
        return (doc) ? restoreEntity(doc) : doc
    }
    
}
async function joinParticipants(chat:ChatDocument){
    for (const p of chat.participants) {
        const e = await EmployeeModel.findOne({name:p})
        if (e) {
            e.chats.push(chat.chatId)
            await e.save()
        }
        
    }
}
function assembleDocument(chat:Chat){
    return <ChatSchema>{...chat,chatId:chat.id}
}
function restoreEntity(raw:ChatDocument):Chat{
    return new Chat(raw.id,raw.name,raw.participants,raw.content)
}

interface MessageSchema {
    description:string,
    author:string,
    releaseDate:string
}

interface ChatSchema {
    chatId:string,
    name:string
    participants:string[]
    content:MessageSchema[]
}
const msg = new Schema({
    description:String,
    author:String,
    releaseDate:String
},{_id:false})
const chat = new Schema({
    chatId:{
        type:String,
        required:true,
        index:true
    },
    name:String,
    participants:{
        type:[String],
        default:[]
    },
    content:[msg]
    
})

type ChatDocument = ChatSchema & Document

const ChatModel = model<ChatDocument>("Chat", chat)