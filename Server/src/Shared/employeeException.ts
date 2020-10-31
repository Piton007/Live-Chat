export class EmployeeNotFoundException extends Error {

    constructor() {
        super("This employee doesnt exists")

        Object.setPrototypeOf(this, EmployeeNotFoundException.prototype)
    }
}

export class EmployeeDuplicatedException extends Error {

    constructor() {
        super("This email is already in use")

        Object.setPrototypeOf(this, EmployeeNotFoundException.prototype)
    }
}