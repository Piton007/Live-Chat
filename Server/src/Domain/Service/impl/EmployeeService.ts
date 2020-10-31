import EmployeeMongooseRepository from "../../../Data/Employee";
import Employee from "../../Employee/Entity";
import { EmployeeRepository } from "../../Employee/Repository";
import { EmployeeReqDTO, EmployeeRespDTO } from "../../../Application/DTO/employeeDTO";
import IEmployeeService from "../EmployeeService"
import { EmployeeDuplicatedException, EmployeeNotFoundException } from "../../../Shared/employeeException";
import { v4 } from "uuid";

export default class EmployeeService implements IEmployeeService {

    private readonly repository:EmployeeRepository

    constructor(repository:EmployeeMongooseRepository){
        this.repository = repository
    }

    async findByIds(ids: string[]): Promise<Employee[]> {
        return (await this.repository.findByIds(ids))
    }
  

    async create(employee:EmployeeReqDTO) {
        const duplicated = await this.repository.findByEmailOrNull(employee.email)
        if (duplicated)
            throw new EmployeeDuplicatedException()
        const entity = new Employee(v4(),employee.email,employee.name,'')
        const id = await this.repository.create(entity)
        return {...employee,id}
    }

    

    async getAll(): Promise<EmployeeRespDTO[]> {
        return (await this.repository.findAllEmployees()).map(x=>this.assemblerDTOFromEntity(x))
    }
    async findByEmail(email:string) {
        const actual = await this.repository.findByEmailOrNull(email)
        if (actual === null) throw new EmployeeNotFoundException()
        return this.assemblerDTOFromEntity(actual)
    }

   private assemblerDTOFromEntity(entity:Employee):EmployeeRespDTO{
        return {...entity,name:entity.fullName}
   }

}
