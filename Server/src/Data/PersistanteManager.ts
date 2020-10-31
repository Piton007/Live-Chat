import mongoose from "mongoose"

export default class PersistanceManager {
    readonly connectionString:string
    constructor(connectionString:string){
        this.connectionString = connectionString
    }

    connect() {
        return mongoose
            .connect(this.connectionString, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            
    }
}