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
import EditBookIcon from '../assets/images/editBookIcon.png'
import theme from '../theme'
import { textAlign } from '@mui/system';
import { 
        getBookToEdit, 
        getEditBookModal, 
        getPublishers, 
        editBookModal, 
        uploadBookImage, 
        getUploadImageStatus,
        updateBookData,
        getUpdateBookDataStatus,
        getBooks,
        fetchBooks,
        clearUpdateStatus
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
    bugName:{
        [theme.breakpoints.down('xs')]:{
            display:'none'
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
    }
   
 

}))

const EditBook = () => {

const dispatch = useDispatch()

const showEditBookModal = useSelector(getEditBookModal)
const bookToEdit = useSelector(getBookToEdit)
const publishers = useSelector(getPublishers)
const uploadImageStatus = useSelector(getUploadImageStatus)
const bookUpdateStatus = useSelector(getUpdateBookDataStatus)

const navigate = useNavigate()

const classes = useStyle()

const [values, setValues] = useState({
    
    id: '',
    title:'',
    description:'',
    pages:'',
    publisher:'',
    price:'',
    authors:'',
    image:'',
    imageFile:''
    
})


//store all values from selecte book in useEffect to prevent delays. Use book.Title or any other item in
//book object in useEffect dependency array
useEffect(()=>{
if(Object.keys(bookToEdit).length !== 0){
    bookToEdit.map(item=>{
        setValues({
            id: item.Id,
            title:item.Title,
            description:item.Description,
            pages:item.Pages,
            publisher: Object.values(publishers).filter(item=>item.Id===1)[0].name,
            price:item.Price,
            authors:item.Author,
            image:item.Image,
            imageFile:''
        })
    })
}
    //book updated successfuly do redirect user to viewBugs
    if(bookUpdateStatus.hasOwnProperty('message')){
        dispatch(fetchBooks())
        dispatch(editBookModal(false))
        dispatch(clearUpdateStatus())
        navigate('/books')
    }

 },[bookToEdit, bookUpdateStatus])

const handleChange = name => event => {
    setValues({...values, [name]:event.target.value})   
    
}

const handleUpload = event => {
    
    let formData = new FormData()
    //If image for any book is already changed and includes timestamp get only root name and add
    //timestamp and extension
    if(bookToEdit[0].Image.includes('/') && bookToEdit[0].Image.includes('images')){
        formData.append('test', event.target.files[0], `${bookToEdit[0].Image.split('/')[2].split('-')[0]}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
    }else{
        //if new image uploaded name it by using original name of the first image and add
        //timestamp. Timestamp used to prevent caching error
        formData.append('test', event.target.files[0], `${values.image}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
    }

    dispatch(uploadBookImage(formData))
}

const clickHandler = () => {
    const book = {
            params:bookToEdit.map(item=>item._id),
            data:{
                Id: values.id,
                Title:values.title,
                Description:values.description,
                Pages:values.pages,
                Publisher:values.publisher,
                Price:values.price,
                Authors:values.authors,
                Image: uploadImageStatus.hasOwnProperty('imageUrl') ? 
                uploadImageStatus.imageUrl
                : values.image
            }
        
        }
    dispatch(updateBookData(book))
}



const uploadPhoto = () => {
   document.getElementById('upload').click()
}


return (

<Dialog
fullScreen
open={showEditBookModal}
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
                        style={{
                        borderStyle:'solid', 
                        display:'inline-flex',
                        borderWidth:'0.2px',
                        paddingLeft:'2px',
                        borderColor:'grey'}}
                        onChange={handleChange('id')} value={values.id}/>
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
                            style={{ 
                            display:'inline-flex',
                            borderStyle:'solid', 
                            marginTop:'10px',
                            borderWidth:'0.2px',
                            paddingLeft:'2px',
                            borderColor:'grey'}}
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
                        style={{
                        display:'inline-flex',
                        borderStyle:'solid', 
                        marginTop:'10px',
                        borderWidth:'0.2px',
                        borderColor:'grey',
                        paddingTop:'0'}}
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
                            style={{ 
                            display:'inline-flex',
                            borderStyle:'solid', 
                            marginTop:'10px',
                            borderWidth:'0.2px',
                            paddingLeft:'2px',
                            borderColor:'grey'}}
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
                            style={{ 
                            display:'inline-flex',
                            borderStyle:'solid', 
                            marginTop:'10px',
                            borderWidth:'0.2px',
                            paddingLeft:'2px',
                            borderColor:'grey'}}
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

                <Grid item xs={12} md={12} lg={12} xl={12} className={classes.buttons}>
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
                            onClick={()=>dispatch(editBookModal(false))}
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
                    src={Object.keys(uploadImageStatus).length !== 0 && uploadImageStatus.hasOwnProperty('imageUrl')
                        ? uploadImageStatus.imageUrl
                        : Object.keys(bookToEdit).length !== 0 ?
                        `/images/${values.image.includes('/images') ? values.image.split('/')[2] : values.image+'.jpg'}`
                        : 'test.jpg'
                        }>

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
                            onClick={()=>dispatch(editBookModal(false))}
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

export default EditBook