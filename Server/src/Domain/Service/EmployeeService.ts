import { EmployeeReqDTO, EmployeeRespDTO } from "../../Application/DTO/employeeDTO";
import Employee from "../Employee/Entity";

export default interface EmployeeService {
    create(employee:EmployeeReqDTO):Promise<EmployeeRespDTO>
    getAll():Promise<EmployeeRespDTO[]>
    findByIds(ids:string[]):Promise<Employee[]>
    findByEmail(email:string):Promise<EmployeeRespDTO>
}
