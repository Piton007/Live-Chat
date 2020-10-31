import App from "./app"
import { config } from "dotenv"
import ChatMongooseRepository from "./Data/chat"
import EmployeeMongooseRepository from "./Data/Employee"
import DB from "./Data/PersistanteManager"
import { ChatService } from "./Domain/Service/impl/ChatService"
import EmployeeService from "./Domain/Service/impl/EmployeeService"

config()
new DB(process.env.CONNECTION_STRING!).connect().then(() => {
    const chatService = new ChatService(new ChatMongooseRepository())
    const employeeService = new EmployeeService(new EmployeeMongooseRepository())
    new App()
    .routeEmployee(employeeService,chatService)
    .attachWS(employeeService,chatService)
    .listen(process.env.PORT!)
})
.catch((err) => {
    console.log(err)
    process.exit(1)
})






