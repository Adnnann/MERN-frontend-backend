import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import HomePageIcon from '../assets/images/homePageIcon.png'
import Item from '@mui/material/Grid'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Header from './core/Header'
import { AppBar, NavBar, Container, Toolbar } from "@mui/material"

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

const Home = () => {

    const classes = useStyles()

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
                    src={HomePageIcon}
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