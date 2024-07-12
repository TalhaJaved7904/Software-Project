import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Route, Routes, useNavigate } from 'react-router-dom';
import STAdd from '../screens/Students/STAdd';
import STlist from '../screens/Students/STlist';
import STtransfer from '../screens/Students/STtransfer';
import BATreeview from '../components/batreeview';
import PageNotFound from '../screens/PgeNotFound';
import TEadd from '../screens/Teachers/TEadd';
import TEallocation from '../screens/Teachers/TEallocation';
import TElist from '../screens/Teachers/TElist';
import SBadd from '../screens/Subjects/SBadd';
import SBlist from '../screens/Subjects/SBlist';
import SYform from '../screens/Syllabus/SYform';
import SYlist from '../screens/Syllabus/SYlist';
import FEstructure from '../screens/Fees/FEstructure';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function DAshboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate() 

  const navigateScreen = (route:string) => {
    navigate(`/DAshboard/${route}`);
  }

  const [treeStructure , settreeStructure] = React.useState([
    {
      moduleName : "STUDENTS",
      child : [
        {
          name : 'ADD STUDENTS',
          route : 'STAdd'
        },
        {
          name : "STUDENTS LIST",
          route : 'STlist'
        },
        {
          name : 'EDIT STUDENTS LIST',
          route : 'STtransfer'
        },
      ]
    },
    {
      moduleName : "TEACHERS",
      child : [
        {
          name : 'Add TEACHERS',
          route : 'TEAdd'
        },
        {
          name : "TEACHER LIST",
          route : 'TElist'
        },
        {
          name : 'TEACHER TRANSFER ',
          route : 'TEallocation'
        },
      ]
    },
    {
      moduleName : "SUBJECTS",
      child : [
        {
          name : 'ADD SUBJECTS',
          route : 'SBadd'
        },
        {
          name : "SUBJECT LIST",
          route : 'SBlist'
        },
      ]
    },
    {
      moduleName : "SYLLABUS",
      child : [
        {
          name : 'SYLLABUS FORM',
          route : 'SYform'
        },
        {
          name : "SYLLABUS LIST",
          route : 'SYlist'
        },
      ]
    },
    {
      moduleName : "FEES",
      child : 
        {
          name : 'FEES STRUCTURE',
          route : 'FEstructure'
        },
    },
  ])


  return (
    <Box sx={{ display: 'flex' }}>
      <h1 style={{color:'black'}}>Hello</h1>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div"
          style={{textAlign : "center"}}>
            LEARNING MANAGEMENT SYSTEM 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <BATreeview treeStructure={treeStructure}/>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path='STAdd' element = {<STAdd/>}/>
          <Route path='STlist' element = {<STlist/>}/>
          <Route path='DAshboard' element = {<DAshboard/>}/>
          <Route path='*' element = {<PageNotFound/>}/>
          <Route path='STtransfer' element = {<STtransfer/>}/>
          <Route path='TEadd' element = {<TEadd/>}/>
          <Route path='TEallocation' element = {<TEallocation/>}/>
          <Route path='TElist' element = {<TElist/>}/>
          <Route path='SBadd' element = {<SBadd/>}/>
          <Route path='SBlist' element = {<SBlist/>}/>
          <Route path='SYform' element = {<SYform/>}/>
          <Route path='SYlist' element = {<SYlist/>}/>
          <Route path='FEstructure' element = {<FEstructure/>}/>
        </Routes>
      </Main>
    </Box>
  );
}