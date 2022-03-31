import * as React from 'react';
import { ButtonGroup, CardMedia, Dialog, Input } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { DialogContent } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
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
        addBookData
} from '../features/librarySlice';
import { Tooltip } from '@mui/material';

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
   
}))

const AddBook = () => {

const dispatch = useDispatch()

const showAddBookModal = useSelector(getAddBookModal)
const publishers = useSelector(getPublishers)
const uploadImageStatus = useSelector(getUploadImageStatus)
const bookAddStatus = useSelector(getAddBookDataStatus)
const books = useSelector(getBooks)

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
        dispatch(addBookModal(false))
        dispatch(clearAddBookStatus())
        setValues({
            title:'',
            description:'',
            pages:'',
            publisher:'',
            price:'',
            author:'',
            image:'',
            imageFile:''
        })
        navigate('/books')
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
        Id: Object.values(books).length+1,
        Title:values.title,
        Description:values.description,
        Pages:values.pages,
        Publisher:values.publisher,
        Price:values.price,
        Author:values.author,
        Image: uploadImageStatus.hasOwnProperty('imageUrl') ? 
        uploadImageStatus.imageUrl
        : 'noimg'
    }
    
   dispatch(addBookData(book))
}

const uploadPhoto = () => {
   document.getElementById('upload').click()
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
                        style={{
                        borderStyle:'solid', 
                        display:'inline-flex',
                        borderWidth:'0.2px',
                        paddingLeft:'2px',
                        borderColor:'grey'}}
                        value={Object.values(books).length+1}/>
                </Item>
            </Grid>

 
            <Grid container >

                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        style={{
                            display:'inline-flex', 
                            paddingTop:'10px'}}>
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
                        style={{
                            display:'inline-flex', 
                            paddingTop:'10px'}}>
                            Author:
                        </Typography>
                    </Item>
                </Grid>

    
                <Grid item xs={12} md={8} lg={8} xl={8} display={'block'}>
          
                        <Item >
                            <Tooltip title="For more than one author add <, name of new author>"> 
                                <Input 
                                fullWidth
                                className={classes.inputField}
                                onChange={handleChange('author')} value={values.author}/>
                            </Tooltip>  
                        </Item>
    
                    

            </Grid>
   
                <Grid item xs={12} md={3} lg={3} xl={3}>
                    <Item className={classes.label}>
                        <Typography 
                        variant='h5' 
                        style={{
                        display:'inline-flex', 
                        paddingTop:'10px'
                        }}>
                        Description:
                        </Typography>
                    </Item>
                </Grid>
        
                <Grid item xs={12} md={9} lg={9} xl={9}>
            
                    <Item>
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
                        style={{
                        display:'inline-flex', 
                        paddingTop:'10px'
                        }}>
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
                        style={{
                        display:'inline-flex', 
                        paddingTop:'10px'
                        }}>
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
                        style={{
                        display:'inline-flex', 
                        paddingTop:'10px'
                        }}>
                        Publishers:
                        </Typography>
                    </Item>
                </Grid>

                <Grid item xs={6} md={3} lg={3} xl={3}>
            
                    <Item>
                        
                        <Select fullWidth 
                        onChange={handleChange('publisher')}
                        value={Object.keys(publishers).length !== 0 ?
                            values.publisher ?
                            values.publisher : ''
                            : ''
                            }
                        style={{
                            marginTop:'10px',
                            borderStyle:'solid',
                            borderColor:'grey',
                            borderWidth:'1px'
                        }}>
                       
                        {
                            Object.keys(publishers).length !== 0 ?
                            Object.values(publishers).map((item, index)=>{ 
                                return(
                                <MenuItem 
                                    key={index}
                                    value={item.name}>
                                    {item.name}
                                </MenuItem>
                                )
                            })
                           
                            : ''
                        } 
                                
                        </Select>
                
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
                            onClick={()=>dispatch(addBookModal(false))}
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
                </Grid>

            </Grid>

            <Grid item xs={12} md={12} lg={12} xl={12} className={classes.mobileWinButtons}>
                    <Grid container justifyContent={
                        'flex-end'
                        }>
                        <Item>
                       
                            <Button variant='contained' 
                            
                            style={{
                                minWidth:'100px', 
                                height:'40px', 
                                marginRight:'20px'}}>Save</Button>
                            <Button 
                            onClick={()=>dispatch(addBookModal(false))}
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