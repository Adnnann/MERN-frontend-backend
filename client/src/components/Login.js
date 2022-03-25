import React, {useState} from "react"
import { Icon, Typography, TextField, Button, Card, CardContent, CardActions, InputLabel } from "@mui/material"
import { makeStyles } from "@mui/styles"
// import { signinUser, 
//             getUserSigninData, 
//             userToken, 
//             getUserToken, 
//             fetchUserTransactions,
//             userDataToDisplay} from "../features/usersSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import {Grid} from '@mui/material'
import { Box } from "@mui/material"
import Header from "./core/Header"


const useStyles = makeStyles(theme=>({
    
    error: {
        verticalAlign: 'middle'
    },
    inputFields:{
        display:'inline-flex', 
        minHeight:'40px',
        borderRadius:'5px',
        minWidth:"220px", 
        borderColor:'grey', 
        borderWidth:"1px"

    },
    loginForm:{
        borderColor:'black', 
        borderStyle:'solid',
        [theme.breakpoints.down('xs')]:{
            borderStyle:'none'
        }
    },
    loginButton:{
        marginBottom:'10px',
        marginTop:'100px',
        width:'100px',
        minHeight:"50px"
    }
    
}))


    const Login = () => {
    
        const classes = useStyles()
       // const userSigninData = useSelector(getUserSigninData)
        const dispatch = useDispatch()
        const navigate = useNavigate()
       // const token = useSelector(getUserToken)
        const [values, setValues] = useState({
            username:'',
            password:'',
        })
    
        //if user has token (is logged) redirected to protected page
        // useEffect(()=>{
        //     if(userSigninData.hasOwnProperty("token")){
        //         dispatch(fetchUserTransactions())
        //         dispatch(userDataToDisplay({user:userSigninData.user}))
        //         dispatch(userToken())
        //         navigate('/dashboard')
        //     }
            
        // },[userSigninData])
    
        // send request to server to login user and in case there are errors collect error
        const clickSubmit = () => {
            const user = {
                username: values.email || undefined,
                password: values.password || undefined
            }
           // dispatch(signinUser(user))    
        }
    
        // get values from input fields
        const handleChange = name => event => {
            setValues({...values, [name]: event.target.value})
        }

        const redirectToSignup = () => {
            navigate('/signup')
        }
    
return(

<>
<Header />
<Grid container justifyContent={'center'} paddingTop={4}>

    <Grid item xs={12} md={6} lg={4} xl={4} className={classes.loginForm}> 

        <Typography variant='h3' className={classes.tittle}>Authentication</Typography>
        
        <Grid item xs={12} md={12} lg={12} xl={12} style={{marginTop:'10%'}}>

            <Typography variant='h6' style={{display:'inline-flex', marginRight:'10px'}}>Username</Typography>
            
            <input id="username" type='username' className={classes.inputFields}
            value={values.username} onChange={handleChange('username')} 
            />
                
        </Grid>

        <br />

        <Grid item xs={12} md={12} lg={12} xl={12}>

            <Typography variant='h6' style={{display:'inline-flex', marginRight:'10px'}}>Password</Typography>
            <input id="email" className={classes.inputFields}
            value={values.email} onChange={handleChange('password')} 
            />
                
        </Grid>

                    {/* { //display error returned from server
                        Object.keys(userSigninData).length !== 0 && (
                            <Typography component='p' color='error'>
                                <Icon color='error' className={classes.error}></Icon>
                                {userSigninData.error}
                            </Typography>
                        )
                    } */}
    
                    <Grid item xs={12} md={12} lg={12} xl={12} style={{marginTop:'10px', marginBottom:'10px'}}>

                    <Button color='primary' variant="contained" onClick={clickSubmit} 
                    className={classes.loginButton}>
                        Login
                    </Button>
    
            </Grid>
    
                    
    </Grid>

</Grid>
</>
)

}

export default Login