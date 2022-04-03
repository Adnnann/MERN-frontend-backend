import * as React from 'react';
import { Dialog, Input } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'
import { makeStyles } from '@mui/styles';
import { DialogContent } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate }from 'react-router-dom'
import { 
        getPublishers, 
        getPublisherToEdit,
        fetchPublishers,
        getAddPublisherModal,
        addPublisherModal,
        clearAddPublisherData,
        getAddPublisherDataStatus,
        addPublisherData,
        clearUploadImageStatus
} from '../features/librarySlice';


const useStyle = makeStyles((theme)=>({
    dialogWindow:{
        width:'90%'
    },
    container:{
        [theme.breakpoints.down('xs')]:{
            marginTop:'2%'
        }
    }, 
    topButtons:{
        borderRadius:'25px', 
        minHeight:'60px', 
        minWidth:"120px",
        [theme.breakpoints.down('xs')]:{
            minWidth:'80px',
            borderRadius:'5px',
            marginRight:"10px"
        }
    },
    itemType:{
        textAlign:'right',
        [theme.breakpoints.down('xs')]:{
            textAlign:'left'
        }

    },
    smallScreenTitle:{
        [theme.breakpoints.up('md')]:{
            display:'none',
        }
    },
    image:{
        [theme.breakpoints.down('xs')]:{
            width:'180px',

        },
    },
    label:{
        textAlign:'right',
        marginRight:'10px',
        [theme.breakpoints.down('xs')]:{
            textAlign:'left'
        }
    },
    buttons:{
        [theme.breakpoints.down('xs')]:{
            display:'none'
        }
    },
    mobileWinButtons:{
        [theme.breakpoints.up('md')]:{
            display:'none'
        }
    },
    inputField:{
        display:'inline-flex',
        borderStyle:'solid', 
        marginTop:'10px',
        borderWidth:'0.2px',
        paddingLeft:'2px',
        borderColor:'grey'
    },
    error: {
        verticalAlign: 'middle'
    },
    inputTitle:{
        display:'inline-flex', 
        paddingTop:'10px'
    }

}))

const AddPublisher = () => {

const classes = useStyle()
const dispatch = useDispatch()
const navigate = useNavigate()

const showAddPublisherModal = useSelector(getAddPublisherModal)
const publisherToEdit = useSelector(getPublisherToEdit)
const publisherUpdateStatus = useSelector(getAddPublisherDataStatus)
const publishers = useSelector(getPublishers)

const [values, setValues] = useState({
 
    id: '',
    name:'',
    country:'',
    road:'',
    zipCode:'',
    city:'',
    country:'',
    error:''  
})


useEffect(()=>{

    //book updated successfuly do redirect user to viewBugs
    if(publisherUpdateStatus.hasOwnProperty('message')){
        dispatch(fetchPublishers())
        dispatch(addPublisherModal(false))
        dispatch(clearAddPublisherData())
        dispatch(clearUploadImageStatus())
        
        setValues({
            id: '',
            name:'',
            country:'',
            road:'',
            zipCode:'',
            city:'',
            country:'',
            error:''  
        })
        
        navigate('/publishers')
    }

 },[publisherUpdateStatus])



const handleChange = name => event => {

    setValues({...values, [name]:event.target.value})   
    
}


const clickHandler = () => {

    if(values.road === ''){
        setValues({
            ...values,
            error:"Address is required"
        })
        return
    }

    const publisher = {
                Id: Object.values(publishers).length + 1,
                name:values.name,
                address: values.road,
                country:values.country,
                zipCode:values.zipCode,
                city:values.city,
                country:values.country,  
        }

    dispatch(addPublisherData(publisher))
}

const cancel = () => {
    setValues({
        id: '',
        name:'',
        country:'',
        road:'',
        zipCode:'',
        city:'',
        country:'',
        error:''  
    })
 dispatch(addPublisherModal(false))
}

return (

<Dialog
fullScreen
open={showAddPublisherModal}
//onClose={()=>dispatch(setEditBug(false))}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description">

<DialogContent tabIndex={-1}>
         
<Typography variant='h3'>
    Publisher
</Typography>


<Grid container justifyContent={'center'} textOverflow='scroll'>

    <Grid item xs={12} md={8} lg={8} xl={8}>

        <Grid container style={{
            marginBottom:'4%', paddingBottom:'10px'}}>
        
            <Grid item xs={12} md={3} lg={3} xl={3} >
                <Item className={classes.label}>
                    <Typography 
                        style={{display:'inline-flex'}}
                        variant='h5'>
                        Id:
                    </Typography>
                </Item>
                    
            </Grid>
        
            <Grid item xs={12} md={9} lg={9} xl={9}>
                <Item>
                    <Input 
                        disabled
                        className={classes.inputField}
                        onChange={handleChange('id')} 
                        value={Object.values(publishers).length+1}/>
                </Item>
            </Grid>

 
            <Grid container >

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                            Name:
                        </Typography>
                    </Item>
                </Grid>

    
                <Grid item xs={12} md={8} lg={8} xl={8} display={'block'}>
          
                        <Item >
                            <Input 
                            fullWidth
                            className={classes.inputField}
                            onChange={handleChange('name')} 
                            value={values.name}/>
                        </Item>
    
                    </Grid>

            </Grid>
   
                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                        Address:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={12} md={9} lg={9} xl={9}>
            
                        <Item >
                            <Input 
                            fullWidth
                            className={classes.inputField}
                            onChange={handleChange('road')} 
                            value={values.road}/>
                        </Item>
    
                    </Grid>
                    
                

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                        Zip Code:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={6} md={9} lg={9} xl={9}>
            
                    <Item>
                        <Input 
                            className={classes.inputField}
                            onChange={handleChange('zipCode')} 
                            value={values.zipCode}/>
                    </Item>
                    
                </Grid>

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                            City:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={6} md={9} lg={9} xl={3}>
            
                    <Item>
                        <Input 
                            fullWidth
                            className={classes.inputField}
                            onChange={handleChange('city')} 
                            value={values.city}/>
                    </Item>
                    
                </Grid>

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                            Country:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={6} md={9} lg={9} xl={3}>
            
                    <Item>
                        <Input 
                            fullWidth
                            className={classes.inputField}
                            onChange={handleChange('country')} 
                            value={values.country}/>
                    </Item>
                    
                </Grid>

                </Grid>

                <Grid item xs={12} md={12} lg={12} xl={12} >
                    <Grid container justifyContent={
                        'center'
                        }>
                        <Item className={classes.label}>
                       
                            <Button variant='contained' 
                            onClick={()=>clickHandler()}
                            style={{
                                minWidth:'100px', 
                                height:'40px', 
                                marginRight:'20px'}}>Save</Button>
                            <Button 
                            onClick={cancel}
                            style={{minWidth:'100px', height:'40px'}}
                            variant='contained'>Cancel</Button>
                           
                        </Item>

                       
                    </Grid>
                    <Grid container justifyContent={'center'}>
            
            {
                publisherUpdateStatus.hasOwnProperty('error') !== '' || values.error !== '' ?

                        <Typography 
                        variant='h6' 
                        style={{
                        display:'inline-flex', 
                        paddingTop:'10px',
                        textAlign:'center',
                        color:'red'
                        }}>
                        {publisherUpdateStatus.error}
                        <br />
                        {values.error}
                        </Typography> : null
                    }
        </Grid> 
            
        </Grid>


        
    

    
      

    </Grid>
    
  </Grid>

 </DialogContent>

</Dialog>
  
 
);

}

export default AddPublisher