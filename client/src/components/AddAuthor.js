import * as React from 'react';
import { CardMedia, Dialog, Input } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DialogContent } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate }from 'react-router-dom'
import { 
        uploadBookImage, 
        getUploadImageStatus,
        getAddAuthorModal,
        getAddAuthorDataStatus,
        getAuthors,
        clearAddAuthorStatus,
        addAuthorModal,
        addAuthorData,
        fetchAuthors,
        clearUploadImageStatus,
} from '../features/librarySlice';
import dateFormat from 'dateformat';
import DateInput from './DatePicker';
import Lightpick from 'lightpick'


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


const AddAuthor = () => {

const dispatch = useDispatch()

const showAddAuthorModal = useSelector(getAddAuthorModal)
const uploadImageStatus = useSelector(getUploadImageStatus)
const authorAddStatus = useSelector(getAddAuthorDataStatus)
const authors = useSelector(getAuthors)
const navigate = useNavigate()

const classes = useStyle()


const [values, setValues] = useState({
    id: '',
    name: '',
    biography: '',
    dateOfBirth: '',
    email: '',
    image: ''
})


//store all values from selecte book in useEffect to prevent delays. Use book.Title or any other item in
//book object in useEffect dependency array
useEffect(()=>{

    dispatch(fetchAuthors())

        setValues({
            id: Object.values(authors).length,
            name:'',
            biography:'',
            dateOfBirth:'',
            email:'',
            image: ''
        })
    
    if(authorAddStatus.hasOwnProperty('message')){
        dispatch(clearAddAuthorStatus())
        dispatch(clearUploadImageStatus())
        dispatch(fetchAuthors())
        dispatch(addAuthorModal(false))
    }

 },[authorAddStatus.message])


 

const handleChange = name => event => {

    if(name === 'dateOfBirth'){
    
        setValues({...values, [name]:event}) 
        return
        
    }

   setValues({...values, [name]:event.target.value})       
}

const handleUpload = event => {
    
    let formData = new FormData()
    //If image for any book is already changed and includes timestamp get only root name and add
    //timestamp and extension
   
    //if new image uploaded name it by using original name of the first image and add
    //timestamp. Timestamp used to prevent caching error
    formData.append('test', event.target.files[0], `image-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
    
    dispatch(uploadBookImage(formData))
}

const clickHandler = () => {
    const author = {
            Id: Math.max(...Object.values(authors).map(item=>Number(item.Id)))+1,
            Name: values.name,
            Biography: values.biography,
            Birthday: values.dateOfBirth,
            Email: values.email, 
            Image:uploadImageStatus.hasOwnProperty('imageUrl') ? 
            uploadImageStatus.imageUrl
            : 'noimgUser'     
        }

    dispatch(addAuthorData(author))
}

const uploadPhoto = () => {
   document.getElementById('upload').click()
}

const cancel = () => {
    setValues({
        id: '',
        name:'',
        biography:'',
        dateOfBirth:'',
        email:'',
        image: ''
    })
    dispatch(clearAddAuthorStatus())
        dispatch(clearUploadImageStatus())
    dispatch(addAuthorModal(false))
}



return (

<Dialog
fullScreen
open={showAddAuthorModal}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description">

    <DialogContent tabIndex={-1}>
            
    <Typography variant='h3'>
        Author
    </Typography>

    <input 
    onChange={(event)=>handleUpload(event)}
    type='file' 
    id='upload' 
    style={{visibility:"hidden"}}></input>

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
                        onChange={handleChange('id')} value={Math.max(...Object.values(authors).map(item=>Number(item.Id)))+1}/>
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
                        Biography:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={12} md={9} lg={9} xl={9}>
            
                <Item className={classes.inputField} style={{minWidth:"80%"}}>
                        <TextField
                        multiline
                        fullWidth
                        minRows={4}
                        className={classes.inputField}
                        onChange={handleChange('biography')} 
                        value={values.biography}/>
                    </Item>
                    
                </Grid>

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                        DoB:
                        </Typography>
                    </Item>
                </Grid>
        

                <Grid item xs={12} md={9} lg={9} xl={9}>
                    <Item>
                        <DateInput 
                        selectedDate={values.dateOfBirth}
                        height={'40px'}
                        changeHandler={handleChange('dateOfBirth')}
                        value={values.dateOfBirth !== '' ? 
                        dateFormat(values.dateOfBirth, 'mm/dd/yyyy')
                        : ''}
                        />
                    </Item>
                    
                </Grid>

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                        Email:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={6} md={6} lg={6} xl={6}>
            
                    <Item>
                        <Input 
                            fullWidth
                            className={classes.inputField}
                            onChange={handleChange('email')} value={values.email}/>
                    </Item>
                    
                </Grid>


                <Grid item xs={12} md={12} lg={12} xl={12} className={classes.buttons}>
                    <Grid container marginTop='10px' justifyContent={
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
                            onClick={()=>cancel()}
                            style={{minWidth:'100px', height:'40px'}}
                            variant='contained'>Cancel</Button>
                           
                        </Item>

                       
                    </Grid>
                    
                            
                </Grid>
                {authorAddStatus.hasOwnProperty('error') ?
                <Grid container marginTop='10px' justifyContent={
                        'center'
                        }>
                        <Item className={classes.label}>
                       
                            <Typography 
                                variant='h6' 
                                style={{
                                display:'inline-flex', 
                                paddingTop:'10px',
                                textAlign:'center',
                                color:'red',
                                marginBottom:'1opx'
                                }}>
                                {authorAddStatus.error}
                            </Typography> 
                        </Item>

                       
                    </Grid>
                   
                    : null}    
            </Grid>  
                      
            
        
        </Grid>

{/* Right side grid */}

        <Grid item xs={12} md={3} lg={3} xl={3}>

            <Grid item xs={12} md={12} lg={12} xl={12}>
            <Grid container justifyContent={'center'}>
                <Item className={classes.image}>
                    <CardMedia 
                        component={'img'}
                        style={{width:'220px', marginBottom:'10px'}}
                        src={uploadImageStatus.hasOwnProperty('imageUrl') 
                        ? uploadImageStatus.imageUrl : ''}>

                    </CardMedia> 
                    
                </Item>
                </Grid>
            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12}>
                
                <Grid container justifyContent={'center'}>
                    <Item marginBottom={'20px'} >
                        <Button variant='contained' onClick={uploadPhoto}>
                            Upload photo
                        </Button>
                    </Item>
                    {uploadImageStatus.hasOwnProperty('Error') ?
               
                            <Typography 
                                variant='h6' 
                                style={{
                                display:'inline-flex', 
                                paddingTop:'10px',
                                textAlign:'center',
                                color:'red',
                                marginBottom:'1opx'
                                }}>
                                {uploadImageStatus.Error}
                            </Typography> 
                       
                   
                    : null} 

                </Grid>
                
        </Grid>

    </Grid>

       <Grid item xs={12} md={12} lg={12} xl={12} className={classes.mobileWinButtons}>
                    <Grid container justifyContent={
                        'flex-end'
                        }>
                        <Item>
                       
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
    
 </Grid>

 </DialogContent>

</Dialog>
  
 
);

}

export default AddAuthor