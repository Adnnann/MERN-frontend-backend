import React from "react";
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box'
import { getToken, getUserLoginData, resetStore } from "../../features/librarySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import BookIcon from '../../assets/images/bookIcon.png'
import { Grid } from "@mui/material";
import { logout } from '../../features/librarySlice';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout'
import Buttons from "./Buttons";
import { Tooltip } from "@mui/material";

const useStyles = makeStyles(theme=>({
    title:{
        padding: `${theme.spacing(5)}px ${theme.spacing(2.5)}px
        ${theme.spacing(2)}px`,
        color: theme.palette.openTitle
    },
  
}))

const Header = () => {

const classes = useStyles()
const dispatch = useDispatch()
const navigate = useNavigate()
const userToken = useSelector(getToken)


const login = () => {
    navigate('/login')
}

const redirectToHomePage = () => {
    navigate('/')
}

const redirectToTeamPage = () => {
    navigate('/ourTeam')
}

const logOut = () => {
  dispatch(logout())
  dispatch(resetStore())
  navigate('/')
}


    
return(
        
    <AppBar position="static"  >

        <Toolbar style={{marginBottom:'0'}}>

            <Grid container>
                
                
                <Box
                onClick={()=>navigate('/')}
                component="img"
                sx={{height:  64, marginTop:'10px', marginRight:'0', display:'inline-flex', justifyContent:'right'}}
                alt="Book"
                src={BookIcon}
                />

    
                

                <Typography variant="h4" className={classes.title}>
                    Library
                </Typography>

                <div style={{marginLeft:'auto', marginTop:"2%"}}>
                <Buttons 
                    firstButton={redirectToHomePage}
                    firstButtonIcon={<HomeIcon />}
                    firstButtonText={'Home'}
                    secondButton={redirectToTeamPage}
                    secondButtonIcon={<GroupsIcon />}
                    secondButtonText={'Our Team'}
                    thirdButton={userToken.hasOwnProperty('message') ? logOut : login}
                    thirdButtonIcon={userToken.hasOwnProperty('message') ? <LogoutIcon /> : <LoginIcon />}
                    thirdButtonText={userToken.hasOwnProperty('message') ? 'Log Out' : 'Log In'} 
                    />
                </div> 

            </Grid> 

          
                
        </Toolbar>
    
    </AppBar>
    )


}
    

export default Header