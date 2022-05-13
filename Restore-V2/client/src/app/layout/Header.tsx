import { AppBar,Typography,Toolbar,
    Switch,List,ListItem,
     IconButton, Badge, Box} from '@mui/material';
import { ShoppingCart } from "@mui/icons-material";
import { NavLink,Link} from 'react-router-dom';
//import { useStoreContext } from '../context/StoreContext';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignInMenu';

interface Props{
    isDark:boolean,
    toggleMode:()=>void;
}
const midLinks=[
    {title:'catalog',path:'/catalog'},
    {title:'about',path:'/about'},
    {title:'contact',path:'/contact'}
];

const rightLinks=[
    {title:'login',path:'/login'},
    {title:'register',path:'/register'},

];

const useStyles={color:'inherit',typography:'h6',
'&:hover':{
  color:'grey.500'
},
'&.active':{
  color:'text.secondary'
},
textDecoration:'none'};

const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

export default function Header({toggleMode,isDark}:Props)
{

    const {basket} = useAppSelector(state => state.basket); //useStoreContext();
    const { user } = useAppSelector(state => state.account);
    const itemCount = basket?.items.reduce((sum,item)=> sum+=item.quantity,0);
    return(
    <AppBar position='static' sx={{mb:4}}>
        <Toolbar sx={{display:'flex',justifyContent:'space-between', alignment:'center'}}>
        <Box display='flex' alignItems='center'>
        <Typography variant='h6' component={NavLink} to='/' exact 
        sx={useStyles}>RE-STORE</Typography>
        <Switch checked={isDark} onChange={toggleMode}></Switch>
        </Box>
       
        <List sx={{display:'flex'}}>
             {
             midLinks.map(({title,path})=>(
                 <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={useStyles}>

                          {title.toUpperCase()}
                 </ListItem>   
             ))
             }

        </List>
        
        <Box display='flex' alignItems='center'>

      
              <IconButton component={Link} to='/basket' size='large'>
                  <Badge badgeContent={itemCount} color='secondary'>
                    <ShoppingCart></ShoppingCart>
                  </Badge>
              </IconButton>
              {user ? (
                        <SignedInMenu />
                    ) : (
                        <List sx={{ display: 'flex' }}>
                            {rightLinks.map(({ title, path }) => (
                                <ListItem
                                    component={NavLink}
                                    to={path}
                                    key={path}
                                    sx={navStyles}
                                >
                                    {title.toUpperCase()}
                                </ListItem>
                            ))}
                        </List>
                    )}
        </Box>
        </Toolbar>
    
    </AppBar>


    )
}