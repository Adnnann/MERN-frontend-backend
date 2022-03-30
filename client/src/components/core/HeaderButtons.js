import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLoginData, logout, resetStore } from '../../features/librarySlice';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme=>({
  card: {
      maxWidth:600,
      margin:'auto',
      marginTop:theme.spacing(5),
      marginBottom: theme.spacing(5),
      display:'inline'
  },
  title:{
      padding: `${theme.spacing(5)}px ${theme.spacing(2.5)}px
      ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
  },
  dashboardTitle:{
      padding: `${theme.spacing(1)}px ${theme.spacing(2.5)}px
      ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
  },
  media:{
      minHeight:400
  },
  credit:{
      padding:10,
      textAlign:'right',
      backgroundColor:'#ededed',
      borderBottom:'1px solid #d0d0d0',
      '& a': {
          color:'#3f4771'
      }
  },
  logo: {
      maxWidth: 80,
    },
  rightButtons: {
      marginRight: '2px',
      marginTop:'2%',
      textTransform:'none',
      marginLeft:'auto',
      [theme.breakpoints.down('xs')]:{
          marginLeft:'0px',
          marginTop:'0'
      }
  },
  logoutButton:{
      display:'inline-flex',
      [theme.breakpoints.up('md')]:{
          display:'none',
          color:'red'
      }
  }
  
}))
export default function HeaderButtons() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const classes = useStyles()
  const userLoginData = useSelector(getUserLoginData)


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

  
  
  return (
    <ButtonGroup  variant="contained">
      <Button onClick={redirectToHomePage}
      color='info' startIcon={<HomeIcon />}>Home</Button>
      <Button onClick={redirectToTeamPage}
      color='info' startIcon={<GroupsIcon />}>Team</Button>
      {
        userLoginData.hasOwnProperty('token') ?
        <Button onClick={logOut}
      color='info' startIcon={<LogoutIcon />}>Logout</Button>
      : <Button onClick={login}
      color='info' startIcon={<LoginIcon />}>Login</Button>
      }
      
     
    </ButtonGroup>
    
  );
}

