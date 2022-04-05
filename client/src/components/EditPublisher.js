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
        getPublisherDataModal,
        getPublisherToEdit,
        fetchPublishers,
        editPublisherModal,
        clearPublisherUpdateStatus,
        updatePublisherData,
        getUpdatePublisherDataStatus,
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

const EditPublisher = () => {

const classes = useStyle()
const dispatch = useDispatch()
const navigate = useNavigate()

const showPublisherBookModal = useSelector(getPublisherDataModal)
const publisherToEdit = useSelector(getPublisherToEdit)
const publisherUpdateStatus = useSelector(getUpdatePublisherDataStatus)


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
if(Object.keys(publisherToEdit).length !== 0){
    publisherToEdit.map(item=>{
        setValues({
            id: item.Id,
            name:item.name,
            country:item.country,
            road:item.address.road,
            zipCode:item.zipCode,
            city:item.city,
            country:item.country,
            error:''
        })
    })
}
    //book updated successfuly do redirect user to viewBugs
    if(publisherUpdateStatus.hasOwnProperty('message')){
        dispatch(fetchPublishers())
        dispatch(editPublisherModal(false))
        dispatch(clearPublisherUpdateStatus())
        dispatch(clearUploadImageStatus())
        navigate('/publishers')
    }

 },[publisherToEdit, publisherUpdateStatus])



const handleChange = name => event => {

    setValues({...values, [name]:event.target.value})   
    
}


const clickHandler = () => {
    const publisher = {
            params:publisherToEdit.map(item=>item._id),
            data:{
                Id: values.id,
                name:values.name,
                country:values.country,
                address:values.road,
                zipCode:values.zipCode,
                city:values.city,
                country:values.country,
            }
        }

    dispatch(updatePublisherData(publisher))
}

const cancel = () => {
    dispatch(clearPublisherUpdateStatus())
    dispatch(clearUploadImageStatus())
    dispatch(editPublisherModal(false))
}


return (

<Dialog
fullScreen
open={showPublisherBookModal}
//onClose={()=>dispatch(setEditBug(false))}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description">

<DialogContent tabIndex={-1}>
         
<Typography variant='h3'>
    Publisher
</Typography>


<Grid container justifyContent={'center'}>

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
                        value={values.id}/>
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
                        Road:
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

                </Grid>

                <Grid item xs={12} md={12} lg={12} xl={12} >
                    <Grid container justifyContent={
                        'flex-end'
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
                    
            
        </Grid>


        <Grid item xs={12} md={12} lg={12} xl={12}>
            
            {
                        values.error !== '' ?

                        <Typography 
                        variant='h7' 
                        style={{
                        display:'inline-flex', 
                        paddingTop:'10px',
                        textAlign:'center',
                        color:'red'
                        }}>
                        {values.error}
                        </Typography> : null
                    }
        </Grid>
    

    
      

    </Grid>
    
  </Grid>

 </DialogContent>

</Dialog>
  
 
);

}

export default EditPublisher