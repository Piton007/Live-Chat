import { List, ListItem } from "@material-ui/core"
import React from "react"
import ChatInfo from "../atoms/chat_resume"
import { Chat } from "../models"

interface Props {
    chats:Chat[]
}


export default function({chats}:Props){
    
    return (
        <List>
        {chats.map((c) => (
          <ListItem button key={c.id}>
            <ChatInfo name={c.name} lastMessage={(c.msgs.length>0) ? c.msgs[c.msgs.length - 1].description : ''}   />
          </ListItem>
        ))}
      </List>)
}