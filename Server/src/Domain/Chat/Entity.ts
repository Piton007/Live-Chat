import { Message } from "./Message"

export default class Chat {
    readonly id:string
    readonly name:string
    readonly participants:string[]
    readonly content:Message[]
    constructor(id:string,name:string,participants:string[],content:Message[]){
        this.id = id
        this.name = name
        this.participants = participants
        this.content = content
    }

    addMessage(msg:Message){
        this.content.push(msg)
    }

    countMessages(){
        return this.content.length 
    }
}