import React from "react";
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import Box from '@mui/material/Box'
// import {signoutUser, 
//         getUserSigninData,
//         cleanStore,
//         getUserDataToDisplay} from "../../features/usersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { useState } from "react";
import BookIcon from '../../assets/images/bookIcon.png'
import HeaderButtons from "./HeaderButtons";
import { Grid } from "@mui/material";
import Item from '@mui/material/Grid'
import { Button, ButtonGroup } from "@mui/material";


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
        backgroundColor: 'white',
        marginRight: '2px',
        marginTop:'50px',
        textTransform:'none',
        marginLeft:'auto'
    },
    welcomeMessage:{
        paddingLeft:"20px"
    }
    
}))

const BooksHeader = () => {

  const classes = useStyles()
  const navigate = useNavigate()
//const userData = useSelector(getUserSigninData)
//const displayUserName = useSelector(getUserDataToDisplay)

const redirectToAuthors = () => {
    navigate('/authors')
}

const redirectToBooks = () => {
    navigate('/books')
}

const redirectToPublishers = () => {
    navigate('/publishers')
}

    return(
        
    <AppBar position="static"  >

        <Toolbar style={{marginBottom:'0'}}>

            <Grid container>
                <Box
                component="img"
                sx={{height:  64, marginTop:'10px', marginRight:'0', display:'inline-flex', justifyContent:'right'}}
                alt="Book"
                src={BookIcon}
                />

                <Typography variant="h4" className={classes.title}>
                    Library
                </Typography>

                <div style={{marginLeft:'auto', marginTop:"2%"}}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button onClick={redirectToPublishers}
                    color='info'>Publishers</Button>
                    <Button onClick={redirectToBooks}
                    color='info'>Books</Button>
                    <Button onClick={redirectToAuthors}
                    color='info'>Authors</Button>
                </ButtonGroup> 
                </div> 

            </Grid> 
                
        </Toolbar>
    
    </AppBar>
    )


}
    

export default BooksHeader