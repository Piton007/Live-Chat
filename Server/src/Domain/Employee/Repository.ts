import Employee from './Entity'

export interface EmployeeRepository {
    create(entity:Employee):Promise<string>
    findAllEmployees():Promise<Employee[]>
    findByIdOrNull(id:string):Promise<Employee|null>
    findByIds(id:string[]):Promise<Employee[]>
    findByEmailOrNull(email:string):Promise<Employee|null>
}