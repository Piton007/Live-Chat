import React, { ChangeEvent, useState } from "react"
import Input from '@material-ui/core/Input';
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core";
import useEmployees from "../hooks/useEmployees";


const useStyles = makeStyles(()=>({
    root:{
        '& > *':{
            margin: '1vw'
        } 
    }
}))

export default function(){
    const classes = useStyles()
    const employees = useEmployees()
    const [participants,setParticipants] = useState<string[]>([])
    const [name,setName] = useState<string>('')
    
    function handleParticipantsChange(e:any){
        setParticipants(e.target.value.split(', '))
    }
    function handleGroupName(e:any){
        setName(e.target.value)
    }

   


    return (<form className={classes.root} noValidate autoComplete="off">
      <Input placeholder="Name" value={name} onChange={handleGroupName} />
      <FormControl >
        <InputLabel id="select-employees-label">Participants</InputLabel>
        <Select
          id="select-employees"
          multiple
          value={participants}
          onChange={handleParticipantsChange}
          input={<Input />}
          renderValue={(selected:any) => selected.join(', ')}
        >
           
          {employees.map((e) => (
            <MenuItem key={e.userId} value={e.name}>
              <Checkbox checked={participants.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
    )
    
}