import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import Item from '@mui/material/Grid'
import { Typography } from '@mui/material'
import Header from './core/Header'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserLogoutData, userToken, getUserLoginData, getBooks } from '../features/librarySlice'
import { Navigate, useNavigate } from 'react-router-dom'


const Home = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const books = useSelector(getBooks)
    
    useEffect(()=>{
        
       dispatch(userToken())


    },[])


    return(
        <>
        <Header />  
        <Grid container justifyContent='center'>

            <Grid item xs={12} md={12} lg={12} xl={12}>
                <Item>
                    <Box
                    component="img"
                    sx={{height:  140, marginTop:'5%', marginRight:'0', display:'inline-flex', justifyContent:'right'}}
                    alt="Book"
                    src={'images/LibLogo.png'}
                    />
                </Item>
            </Grid>

            <Grid item xs={10} md={8} lg={8} xl={8}>
                <Typography textAlign={'justify'} style={{marginTop:'2%'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean nec sodales nibh. Phasellus aliquet urna a massa scelerisque, ac gravida augue ornare. Quisque ut mollis lectus. Donec ut tellus at ligula feugiat consectetur. Phasellus placerat, ex id maximus posuere, nisi augue consectetur tellus, quis porttitor leo lacus imperdiet elit. Sed accumsan lectus in finibus porta. Nullam dignissim libero non ante condimentum, ut rutrum justo porta. Proin finibus faucibus bibendum. Proin accumsan ante quam, id rutrum sem dapibus lacinia. Donec pellentesque sodales libero, eget mattis massa ullamcorper et. Integer at ultricies ex, in blandit quam. Donec suscipit eu eros et porta. Quisque sed erat ipsum. Integer venenatis enim a urna volutpat, vel sagittis justo molestie. Integer commodo orci enim. Aliquam pretium velit sit amet eleifend pulvinar.
                </Typography>
            </Grid>
           
        </Grid>
        </>
    )
}

export default Home;