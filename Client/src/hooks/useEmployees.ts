import { useEffect, useState } from "react";
import { Employee } from "../models";
import { getEmployees } from "../networking/http_request";

export default function():Employee[]{
    const [employees,setEmployees] = useState<Array<Employee>>([])
    useEffect(() => {
        let suscribe = true
        if (suscribe){
            getEmployees().then((data:Employee[])=>{
                setEmployees(data)
            })
        }
        return () => {
          suscribe = false
        };
      },[]);
    
      return employees;

}