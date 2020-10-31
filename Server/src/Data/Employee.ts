import { Schema, Document, model } from "mongoose"
import Employee from "../Domain/Employee/Entity"
import { EmployeeRepository } from "../Domain/Employee/Repository"
import { EmployeeNotFoundException } from "../Shared/employeeException"


export default class EmployeeMongooseRepository implements EmployeeRepository {

    async findByIds(ids: string[]): Promise<Employee[]> {
        return (await EmployeeModel.find({employeeId:{$in:ids}})).map(x=>restoreEntity(x))
    }
    async create(entity:Employee):Promise<string>{
        const employee =  new EmployeeModel({employeeId:entity.id,email:entity.email,name:entity.fullName,connectionId:entity.connectionId})
        await employee.save()
        return employee.id
    }

    

    async findAllEmployees():Promise<Employee[]>{
        return (await EmployeeModel.find()).map(x=>restoreEntity(x))
    }

    async findByEmailOrNull(email:string):Promise<Employee|null>{
        const actual = await EmployeeModel.findOne({email})
        
        return (actual) ? restoreEntity(actual) : actual
        
    }

    async findByIdOrNull(id:string):Promise<Employee>{
        const actual =  await EmployeeModel.findById(id)
        if (actual === null) throw new EmployeeNotFoundException()
        return restoreEntity(actual)
    }
}
function restoreEntity(raw:EmployeeDocument):Employee{
    return new Employee(raw._id,raw.email,raw.name,raw.connectionId)
}

interface EmployeeSchema {
    employeeId:string,
    email:string,
    name:string,
    connectionId:string
    chats:string[]
}

const employee = new Schema({
    employeeId:{
        type:String,
        required:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    connectionId:{
        type:String,
        default:''
    },
    chats:{
        type:[String],
        default:[]
    }
})

type EmployeeDocument = EmployeeSchema & Document

export const EmployeeModel = model<EmployeeDocument>("Employee", employee)