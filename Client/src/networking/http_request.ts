import axios from "axios"
import { Employee } from "../models"

export function getEmployees():Promise<Employee[]>{
    return axios.get('employees').then(resp=>resp.data)
} 