import { AppBar,  Container, Typography, Toolbar } from "@mui/material"
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme=>({
    footer:{
      position: 'fixed',
      left: '0',
      bottom: '0',
      width: '100%',
      color: 'white',
      textAlign: 'center',
    },
     
}))

const Footer = () => {

    const classes = useStyles()

    return(
    <div className={classes.footer}> 
        <AppBar style={{position:'relative'}} color="primary" >
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="body1" color="inherit" textAlign={'center'} margin='0 auto'  >
             Copyright &copy; 2021. All rights reserved
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
    )
}

export default Footer