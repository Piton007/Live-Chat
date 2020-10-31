import { AppBar, CssBaseline, IconButton, TextField, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BrowserRouter, useParams, useRouteMatch } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { MsgProps, HostMsg } from "./atoms/msg_view";
import { Send, Visibility } from "@material-ui/icons";
import { getSocketConnection } from "./networking/ws";


const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		// necessary for content to be below app bar
		/* toolbar: theme.mixins.toolbar, */
		root:{
			display:'flex',
			height:'100%',
			flexDirection:'column'
		},
		appBar: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
			height: "4.2rem",
		},
		content: {
			
			marginTop:'50px',
			flex:'1 1 75vh',
			height: "75vh",
			overflowY: "scroll",
		},
	})
);
const messages: MsgProps[] = [
	{
		description: "hey",
		releaseDate: "14:32",
		type: "host",
	},
	{
		description: "hola?",
		releaseDate: "14:40",
		type: "foreign",
	},
	{
		description: "JEJE que paso ?",
		releaseDate: "14:45",
		type: "host",
	},
	{
		description: "JEJE que paso ?",
		releaseDate: "14:45",
		type: "host",
	},
	{
		description: "JEJE que paso ?",
		releaseDate: "14:45",
		type: "foreign",
	},
	{
		description: "JEJE que paso ?",
		releaseDate: "14:45",
		type: "host",
	},
	{
		description: "JEJE que paso ?",
		releaseDate: "14:45",
		type: "host",
	},
	{
		description: "JEJE que paso ?",
		releaseDate: "14:45",
		type: "foreign",
	},
	{
		description: "JEJE que paso ?",
		releaseDate: "14:45",
		type: "foreign",
	},
	{
		description: "JEJE que paso ?",
		releaseDate: "14:45",
		type: "foreign",
	},
];

interface ChatProps {
	author:string

}
interface MsgDTO {
    room:string,
    description:string,
    releaseDate:string,
    author:string
}


export default function ({author}:ChatProps) {
	
	const { id } = useParams<{ id: string }>();
	const classes = useStyles();
	
	const [msgs,setMsgs] = useState<MsgProps[]>(messages)
	const [msg,setMsg] = useState<string>('')
	function sendMsg(){
		if (msg){
			const actual:MsgProps = {description:msg,releaseDate:new Date().toLocaleString(),type:'host'}
			setMsg('')
			console.log(msg)
			setMsgs(msgs.concat(actual))
			getSocketConnection().sendMsg({room:id,author,...actual})
			
		}
		
	}
	function addForeignMsg(msg:MsgProps){
		setMsgs(msgs.concat(msg))
	}

	useEffect(()=>{
		let suscribe = true
		if(suscribe){
      	getSocketConnection().join(id)
			getSocketConnection().listenToForeignMsg((msg:MsgDTO)=>{
				addForeignMsg({type:'foreign',...msg})
			})
			
			
		}
	},[])

	return (
		<React.Fragment>
			
			<AppBar className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" noWrap>
						{id}
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.root}>
				<div className={classes.content}>
					{msgs.map((x, index) => (
						<div style={{ margin: "15px 20px" }}>
							<HostMsg key={index} {...x} />
						</div>
					))}
				</div>
				<TextField
					id="outlined-multiline-static"
					label="Chat"
					placeholder='Envia un mensaje aqui'
					multiline
					fullWidth
					style={{marginTop:'10px',flex:'1 0 auto'}}
					onKeyDown={(e)=>{
						if (e.keyCode === 13)sendMsg()
					}}
					value={msg}
					onChange={(v)=>{setMsg(v.target.value)}}
					InputProps={{
						endAdornment:<IconButton
						aria-label="toggle password visibility"
						onClick={sendMsg}
					  >
						<Send />
					  </IconButton>
					}}
					/>
			</div>
			
		</React.Fragment>
	);
}
