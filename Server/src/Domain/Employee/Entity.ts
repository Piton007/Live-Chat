export default class Employee {
    readonly id: string
    readonly email:string
    readonly fullName:string
    readonly connectionId:string
    constructor(id:string,email:string,fullName:string,connectionId:string){
        this.connectionId = connectionId
        this.id = id
        this.email = email
        this.fullName = fullName
    }


}