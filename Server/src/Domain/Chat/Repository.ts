import Chat from './Entity'

export interface ChatRepository {
    create(chat:Chat):Promise<void>
    save(chat:Chat):Promise<void>
    findAllByEmployee(employeeId:string):Promise<Chat[]>
    findByIdOrNull(id:string):Promise<Chat|null>
}