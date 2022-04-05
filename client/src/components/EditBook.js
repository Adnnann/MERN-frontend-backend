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
        clearUpdateStatus,
        getAuthors,
        setAuthorData,
        displayAuthorDataModal,
        clearUploadImageStatus
} from '../features/librarySlice';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TableComponent from './TableComponent';
import SelectField from './SelectField';
import { red } from '@mui/material/colors';

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
    },
    mobileWinErrors:{
        [theme.breakpoints.up('md')]:{
            display:'none'
        }
    }

}))

const EditBook = () => {

const classes = useStyle()
const dispatch = useDispatch()
const navigate = useNavigate()
const [menuValue, setMenuValue] = useState()

const showEditBookModal = useSelector(getEditBookModal)
const bookToEdit = useSelector(getBookToEdit)
const publishers = useSelector(getPublishers)
const uploadImageStatus = useSelector(getUploadImageStatus)
const bookUpdateStatus = useSelector(getUpdateBookDataStatus)
const books = useSelector(getBooks)
const authors = useSelector(getAuthors)

const columns = [
    { 
        id: 'authors', 
        label: 'Authors', 
        minWidth: 10,
        align:'center'
    },
    
    { 
    id: 'view',
    label:<a onClick={()=>setNewAuthor(true)}>+</a>,
    minWidth: 10,
    align: 'center',
    
    }
  ];

  
  function createDataAuthors(authors, view) {
      return { authors, view};
    
  }

  const rows = [];
  

    const [values, setValues] = useState({
        
        id: '',
        title:'',
        description:'',
        pages:'',
        publisher:'',
        price:'',
        authors:'',
        image:'',
        imageFile:'',
        addedAuthor:'',
        error:''

        
    })

const [addNewAuthor, setNewAuthor] = useState(false)
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
            publisher: item.Publisher,
            price:Number(item.Price).toFixed(2),
            authors:item.Author,
            image:item.Image,
            imageFile:'',
            addedAuthor:'',
            error:''
        })
    })
}
    //book updated successfuly do redirect user to viewBugs
    if(bookUpdateStatus.hasOwnProperty('message')){
        dispatch(fetchBooks())
        dispatch(editBookModal(false))
        dispatch(clearUpdateStatus())
        dispatch(clearUploadImageStatus())
        navigate('/books')
    }

 },[bookToEdit, bookUpdateStatus.message])



 const createRowsAuthors = () =>{

 if(values.authors.includes(',')){
    values.authors.split(',').map(item=>{
        let firstCol = <div>
                           {item}    
                        </div>
    
        let secondCol = <span onClick={()=>viewAuthor(item)}> <VisibilityOutlinedIcon /> </span>
        rows.push(createDataAuthors(firstCol, secondCol))  
     })
 }else{
    let firstColumn = <div>
                {values.authors}   
                </div>

    let secondColumn = <span onClick={()=>viewAuthor(values.authors)}> 
                         <VisibilityOutlinedIcon /> 
                        </span>
    rows.push(createDataAuthors(firstColumn, secondColumn)) 
 }
 }

const handleChange = name => event => {

    if(name === 'addedAuthor' && values.authors.split(',').includes(event.target.value)){
        setValues({
            ...values,
            error:`Author ${event.target.value} already exist`
        })
    
        return
        
    }else{

        setValues({...values, 
            [name]:event.target.value,
            error:''})
    }
     
    
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
        if(bookToEdit[0].Image.includes('noimgUser')
            || bookToEdit[0].Image.includes('noimg')){
                formData.append('test', event.target.files[0], `image-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)  
            }else{
                formData.append('test', event.target.files[0], `${values.image}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
            }
        
    }

    dispatch(uploadBookImage(formData))
}

const viewAuthor = (name) => {
    dispatch(setAuthorData(Object.values(authors)
    .filter(item=>item.Name===name)))

    dispatch(displayAuthorDataModal(true))
    
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
                Author:values.authors,
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

const addAuthor = () => {

    if(values.addedAuthor === ''){
        setValues({
            ...values,
            error:'Please select author'
        })
        return
    }else if(values.authors.slice(',').includes(values.addedAuthor)){
        setValues({
            ...values,
            error:'Author already exists'
        })
        return
    }

    setValues({
        ...values,
        error:'',
        authors: `${values.authors},${values.addedAuthor}`
    })
    
}

const cancel = () => {
    dispatch(clearUpdateStatus())
    dispatch(clearUploadImageStatus())
    dispatch(editBookModal(false))
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
                        disabled
                        className={classes.inputField}
                        onChange={handleChange('id')} value={values.id}/>
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
                            onChange={handleChange('pages')} 
                            value={values.pages}/>
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
                            selectedValues={values.publisher ?
                            values.publisher : ''}
                            object={publishers} 
                            objectIndex={'name'}
                        />
                
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
                            onClick={cancel}
                            style={{minWidth:'100px', height:'40px'}}
                            variant='contained'>Cancel</Button>
                           
                        </Item>

            {bookUpdateStatus.hasOwnProperty('error') ?
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
                                {bookUpdateStatus.error}
                            </Typography> 
                        </Item>

                       
                    </Grid>
                   
                    : null} 
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

                <Grid item xs={12} md={12} lg={12} xl={12}>
            
            <Grid container justifyContent={'center'}>

             <Item style={{marginBottom:'10px'}}>

                <TableComponent
                    columns={columns}
                    rows = {rows}
                    createRows={createRowsAuthors}
                    createData={createDataAuthors}
                />
             
            </Item>

        </Grid>
        {addNewAuthor ? 
        <>
            <Grid container justifyContent={'center'}>
            
                <Item>
               
                        <SelectField
                            handleChange={handleChange('addedAuthor')} 
                            selectedValues={values.addedAuthor}
                            object={authors} 
                            objectIndex={'Name'}
                        />

                </Item>

            </Grid>

            <Grid container justifyContent={'center'}>
            
                <Item>
                    <Button variant='contained' 
                    onClick={()=>addAuthor()}
                    style={{marginTop:"20px", marginBottom:'20px'}}>
                        Add author
                    </Button>
                </Item>
                
            </Grid>

            <Grid container justifyContent={'center'}>
            
                <Item>
                    <Button variant='contained' 
                    onClick={cancel}
                    style={{marginBottom:'20px'}}>
                    Cancel</Button>
                </Item>
                
            </Grid>
            </> : null}
            {
                        values.error !== '' ?

                        <Typography 
                        variant='h6' 
                        style={{
                        display:'inline-flex', 
                        paddingTop:'10px',
                        textAlign:'center',
                        color:'red',
                        marginBottom:'1opx'
                        }}>
                        {values.error}
                        </Typography> : null
                    }
        </Grid>
    

    </Grid>

    {bookUpdateStatus.hasOwnProperty('error') ?
                            <Typography 
                            className={classes.mobileWinErrors}
                                variant='h6' 
                               style={{color:'red', marginTop:'0', marginBottom:'10px'}}>
                                {bookUpdateStatus.error}
                            </Typography> 
                        
                    : null}

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
                    onClick={()=>dispatch(editBookModal(false))}
                    style={{
                        minWidth:'100px', 
                        height:'40px'}}
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