import React from 'react';
import logo from './logo.svg';
import './App.css';
import { init } from './Socket';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Divider, List, ListItem } from '@material-ui/core';
import { Chat } from './models';
import ChatList from "./molecules/chat_list"

const drawerWidth = 240;



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export const Socket = React.createContext('hello')
const chats:Chat[] = [{
  employees:['Jose','Eli'],
  id:'123',
  msgs:[],
  name:'Chat1'},{
    employees:['Cesar','Rodrigo'],
  id:'124',
  msgs:[{dateCreated:'asdasd',description:'hey',employeeId:'asdas'}],
  name:'Chat2'}
  ]


function App() {
  const classes = useStyles()
  const drawer =(
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <ChatList  chats={chats} />    
      </div>
  )
  return (
    <div >
      <CssBaseline />
      <Socket.Provider value='hello' >
      {drawer}
      
      </Socket.Provider>
    </div>
  );
}

export default App;
