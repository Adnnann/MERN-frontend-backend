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
import { Icon } from '@mui/material';
import { 
        getAddBookModal,
        getAddBookDataStatus,
        getPublishers,
        uploadBookImage, 
        getUploadImageStatus,
        getBooks,
        fetchBooks,
        clearAddBookStatus,
        addBookModal,
        addBookData,
        getDisableAuthorNameField,
        getAuthorToEdit,
        setDisableAuthorNameField,
        clearUploadImageStatus,
        getAuthors
} from '../features/librarySlice';
import SelectField from './SelectField';

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

const AddBook = () => {

const dispatch = useDispatch()

const showAddBookModal = useSelector(getAddBookModal)
const publishers = useSelector(getPublishers)
const uploadImageStatus = useSelector(getUploadImageStatus)
const bookAddStatus = useSelector(getAddBookDataStatus)
const books = useSelector(getBooks)
const disableAuthorNameField = useSelector(getDisableAuthorNameField)
const authorToEdit = useSelector(getAuthorToEdit)
const authors = useSelector(getAuthors)

const navigate = useNavigate()

const classes = useStyle()

const [values, setValues] = useState({
    
    title:'',
    description:'',
    pages:'',
    publisher:'',
    price:'',
    author:'',
    image:'',
    imageFile:''
    
})

//store all values from selecte book in useEffect to prevent delays. Use book.Title or any other item in
//book object in useEffect dependency array
useEffect(()=>{

    //book updated successfuly do redirect user to viewBugs
    if(bookAddStatus.hasOwnProperty('message')){
        dispatch(fetchBooks())
        dispatch(clearAddBookStatus())
        dispatch(setDisableAuthorNameField(false))
        dispatch(clearUploadImageStatus())
        setValues({
            title:'',
            description:'',
            pages:'',
            publisher:'',
            price:'',
            author: '',
            image:'',
            imageFile:''
        })
        dispatch(addBookModal(false))
       
    }

 },[bookAddStatus])

const handleChange = name => event => {
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

    const book = {
        Id: Math.max(...Object.values(books).map(item=>Number(item.Id)))+1,
        Title:values.title,
        Description:values.description,
        Pages:values.pages,
        Publisher:values.publisher,
        Price:values.price,
        Author:disableAuthorNameField ? authorToEdit[0].Name : values.author,
        Image: uploadImageStatus.hasOwnProperty('imageUrl') ? 
        uploadImageStatus.imageUrl
        : 'noimg'
    }
    
   dispatch(addBookData(book))
}

const uploadPhoto = () => {
   document.getElementById('upload').click()
}

const cancel = () => {
    setValues({
        title:'',
        description:'',
        pages:'',
        publisher:'',
        price:'',
        author: '',
        image:'',
        imageFile:''
    })

    dispatch(clearAddBookStatus())
    dispatch(clearUploadImageStatus())
    dispatch(setDisableAuthorNameField(false))
    dispatch(addBookModal(false))
}


return (

<Dialog
fullScreen
open={showAddBookModal}
//onClose={()=>dispatch(setEditBug(false))}
aria-labelledby="modal-modal-title"
aria-describedby="modal-modal-description">

<DialogContent tabIndex={-1}>
         
<Typography variant='h3'>
    Book
</Typography>

<input 
onChange={(event)=>handleUpload(event)}
type='file' 
id='upload' 
style={{visibility:"hidden"}}></input>



{//display error returned from server
    Object.keys(bookAddStatus).length !== 0 && bookAddStatus.hasOwnProperty('error') ? (
        <Grid item xs={12} md={12} lg={12} xl={12} style={{textAlign:'center'}}>
        <Typography component='p' color='error'>
            <Icon color='error' className={classes.error}></Icon>
            {bookAddStatus.error}
        </Typography>
        </Grid>
    ) : null
} 
    
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
                        value={Math.max(...Object.values(books).map(item=>Number(item.Id)))+1}/>
                </Item>
            </Grid>

 
            <Grid container >

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                            Title:
                        </Typography>
                    </Item>
                </Grid>

    
                <Grid item xs={12} md={8} lg={8} xl={8} display={'block'}>
          
                        <Item >
                            <Input 
                            fullWidth
                            className={classes.inputField}
                            onChange={handleChange('title')} value={values.title}/>
                        </Item>
    
                    </Grid>

            </Grid>

            <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                            Author:
                        </Typography>
                    </Item>
                </Grid>

    
                <Grid item xs={12} md={8} lg={8} xl={8} display={'block'}>
          
                        <Item style={{maxWidth:'220px', marginBottom:'10px'}}>
                           
                                <SelectField
                                    handleChange={handleChange('author')} 
                                    selectedValues={disableAuthorNameField ? authorToEdit[0].Name : values.author}
                                    object={authors} 
                                    objectIndex={'Name'}
                                    disabled = {disableAuthorNameField }
                                    />
                               
                        </Item>
    
                    

            </Grid>
   
                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                        Description:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={12} md={9} lg={9} xl={9}>
            
                    <Item className={classes.inputField} style={{minWidth:"100%"}}>
                        <TextField
                        multiline
                        fullWidth
                        minRows={4}
                        className={classes.inputField}
                        style={{paddingTop:'0'}}
                        onChange={handleChange('description')} 
                        value={values.description}/>
                    </Item>
                    
                </Grid>

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                        Pages:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={6} md={3} lg={3} xl={3}>
            
                    <Item>
                        <Input 
                            fullWidth
                            className={classes.inputField}
                            onChange={handleChange('pages')} value={values.pages}/>
                    </Item>
                    
                </Grid>

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                        Price:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={6} md={3} lg={3} xl={3}>
            
                    <Item>
                        <Input 
                            fullWidth
                            className={classes.inputField}
                            onChange={handleChange('price')} value={values.price}/>
                    </Item>
                    
                </Grid>

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        className={classes.inputTitle}>
                        Publishers:
                        </Typography>
                    </Item>
                </Grid>

                <Grid item xs={6} md={3} lg={3} xl={3}>
            
                    <Item>
                        
                        <SelectField
                            handleChange={handleChange('publisher')} 
                            selectedValues={Object.keys(publishers).length !== 0 ?
                            values.publisher ?
                            values.publisher : ''
                            : ''
                            }
                            object={publishers} 
                            objectIndex={'name'}
                        />
                
                    </Item>
               
                </Grid>

                <Grid item xs={12} md={10} lg={12} xl={12} className={classes.buttons}>
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
                                onClick={()=>cancel()}
                                style={{minWidth:'100px', height:'40px'}}
                                variant='contained'>Cancel</Button>
                           
                        </Item>
                    </Grid>

                </Grid>

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
    
    </Grid>

  </DialogContent>

</Dialog>
  
 
);

}

export default AddBook