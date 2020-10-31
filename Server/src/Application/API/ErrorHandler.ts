export default function employee(error:any,req:any,res:any,next:any){
    
    res.status(500).send({error: error.message})
}