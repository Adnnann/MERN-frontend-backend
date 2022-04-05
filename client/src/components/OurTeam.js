import librarian1 from '../assets/images/librarian1.jpeg'
import librarian2 from '../assets/images/librarian2.jpeg'
import librarian3 from '../assets/images/librarian3.jpeg'
import { Grid, Typography } from '@mui/material'
import Item from '@mui/material/Grid'
import { Card, CardMedia, CardContent } from '@mui/material'
import GroupsIcon from '@mui/icons-material/Groups';
import Header from './core/Header'
import { userToken } from '../features/librarySlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const OurTeam = () => {


    const dispatch = useDispatch()

   useEffect(() => {
       
        dispatch(userToken())

    }, [])

    const librarians = [librarian1, librarian2, librarian3]
    const position = ['Developer', 'UI/UX Designer','QA Engineer']

    return(
        <>
        <Header />
        <Grid container spacing={4} justifyContent='center'>

        <Grid item xs={6} md={6} lg={6} xl={6}>

            <Item>
                <Typography variant='h3' textAlign={'right'}> 
                    <GroupsIcon  style={{fontSize:'100px'}}/>
                </Typography>
            </Item>
   
        </Grid>

        <Grid item xs={6} md={6} lg={6} xl={6}>

            <Item>
                <Typography variant='h3' textAlign={'left'} style={{marginTop:"20px"}}> 
                    Our Team
                </Typography>
            </Item>
            
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
            <Item>
                <hr></hr>
            </Item>
        </Grid>

        <Grid item xs={12} md={12} lg={12} xl={12}>
            <Item>
            
            </Item>
        </Grid>

        {
            librarians.map((item, index)=>{
                return(
                    <Grid item xs={12} md={3} lg={3} xl={3} key={index}>

                        <Item>
                            <Card style={{paddingLeft:'5px', paddingRight:'5px', textAlign:'justify', backgroundColor:'lightgrey'}}>
                                <CardMedia
                                height={220}
                                style={{borderRadius:'50%'}}
                                component={'img'}
                                src={item}
                                >
                                </CardMedia>
                                <CardContent>
                                    <Typography variant='h5' textAlign={'center'} style={{color:'blue'}}>
                                        George Clooney
                                    </Typography>
                                    <Typography variant='h6' textAlign={'center'} style={{marginBottom:'10px', color:'blue'}}>
                                        {position[index]}
                                    </Typography>
                                    <Typography variant='h7' style={{color:'blue'}}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                    Nam vitae felis posuere, facilisis ipsum id, vulputate urna. 
                                    Pellentesque lobortis magna at arcu congue rutrum. Donec a lorem sit 
                                    amet mi feugiat vestibulum. Vestibulum a pellentesque mauris. 
                                    Nulla tellus purus, faucibus nec neque sit amet, tincidunt molestie mauris.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Item>

                    </Grid>
                )
            })
        }
            

        </Grid>
        </>
    )
}

export default OurTeam;