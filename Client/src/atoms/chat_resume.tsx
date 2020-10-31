import React, { useState } from "react"
import { ChatResume } from "../models"




export default function({name,lastMessage}:ChatResume){
    const [visited,setVisited] = useState<boolean>(true)

    return(<div  onClick={()=>{setVisited(false)}} style={{background:(visited) ? 'red':'green',width:'100%'}}>
        <h3>{name}</h3>
        <p>{lastMessage}</p>
    </div>)
}