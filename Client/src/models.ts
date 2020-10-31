export interface Msg {
    employeeId:string,
    dateCreated:string,
    description:string
}

export interface Employee{
    userId:string
    name:string
}

export interface Chat {
    id:string
    name:string
    employees:string[]
    msgs:Msg[]
}

export interface ChatResume{
    name:string
    lastMessage:string
}
