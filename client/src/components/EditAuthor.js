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
        getEditAuthorModal,  
        uploadBookImage, 
        getUploadImageStatus,
        updateAuthorData,
        getUpdateAuthorDataStatus,
        getBooks,
        editAuthorModal,
        clearAuthorUpdateStatus,
        setBookData,
        displayAuthorDataModal,
        addBookModal,
        fetchAuthors,
        setDisableAuthorNameField,
        getAuthorToEdit,
        getAuthorBooks,
        displayBookDataModal,
        clearUploadImageStatus
} from '../features/librarySlice';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TableComponent from './TableComponent';
import dateFormat from 'dateformat';
import DateInput from './DatePicker';



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

const EditAuthor = () => {

const dispatch = useDispatch()

const showAuthorModal = useSelector(getEditAuthorModal)
const authorToEdit = useSelector(getAuthorToEdit)
const books = useSelector(getBooks)
const uploadImageStatus = useSelector(getUploadImageStatus)
const authorUpdateStatus = useSelector(getUpdateAuthorDataStatus)
const authorBooks = useSelector(getAuthorBooks)

const navigate = useNavigate()

const classes = useStyle()

const columns = [
    { 
        id: 'titles', 
        label: 'Titles', 
        minWidth: 10,
        align:'center'
    },
    
    { 
    id: 'view',
    label:<a onClick={()=>newBook()}>+</a>,
    minWidth: 10,
    align: 'center',
    
    }
  ];

const newBook = () => {
    dispatch(setDisableAuthorNameField(true))
    dispatch(editAuthorModal(false))
    dispatch(addBookModal(true))
    
}

  
function createDataAuthors(titles, view) {
    return { titles, view};

}

const rows = [];


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
if(Object.keys(authorToEdit).length !== 0){
    authorToEdit.map(item=>{
        setValues({
            id: item.Id,
            name:item.Name,
            biography:item.Biography,
            dateOfBirth:new Date(item.Birthday),
            email:item.Email,
            image: item.Image
        })
    })
}
    
    if(authorUpdateStatus.hasOwnProperty('message')){
        dispatch(fetchAuthors())
        dispatch(editAuthorModal(false))
        dispatch(clearAuthorUpdateStatus())
        dispatch(clearUploadImageStatus())
        navigate('/authors')
    }

 },[authorToEdit, authorUpdateStatus.message])


 const createRowsAuthors = () =>{

    Object.values(authorBooks)
    .map(item=>{
        let firstCol = <div>
                           {item.Title}    
                        </div>
    
        let secondCol = <span onClick={()=>viewBook(item.Title)}> <VisibilityOutlinedIcon /> </span>
        rows.push(createDataAuthors(firstCol, secondCol))  
     })
 
 }

const handleChange = name => event => {

    if(name === 'dateOfBirth'){
    
        setValues({...values, [name]:event}) 
        return
        
    }

    if(name === 'addedAuthor' && Object.values(books).includes(event.target.value)){
        setValues({
            ...values,
            error:`Book ${event.target.value} already exist`
        })
        return   
    }
   setValues({...values, [name]:event.target.value})       
}

const handleUpload = event => {
     
        let formData = new FormData()
        //If image for any book is already changed and includes timestamp get only root name and add
        //timestamp and extension
        if(authorToEdit[0].Image.includes('/') && authorToEdit[0].Image.includes('images')){
            formData.append('test', event.target.files[0], `${authorToEdit[0].Image.split('/')[2].split('-')[0]}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
        }else{

            if(authorToEdit[0].Image.includes('noimgUser')
            || authorToEdit[0].Image.includes('noimg')){
                formData.append('test', event.target.files[0], `image-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)  
            }else{
                formData.append('test', event.target.files[0], `${values.image}-${Date.now()}.${event.target.files[0].name.split('.')[1]}`)
            }
        
        }

        dispatch(uploadBookImage(formData))
    
}

const viewBook = (book) => {
    dispatch(setBookData(Object.values(books)
    .filter(item=>item.Title===book)))

    dispatch(displayBookDataModal(true))
    
}
const clickHandler = () => {
    const author = {
            params:authorToEdit.map(item=>item._id),
            data:{
                Id: values.id,
                Name: values.name,
                Biography: values.biography,
                Birthday: values.dateOfBirth,
                Email: values.email, 
                Image:uploadImageStatus.hasOwnProperty('imageUrl') ? 
                uploadImageStatus.imageUrl
                : values.image 
               
            }
        }

    dispatch(updateAuthorData(author))
}

const uploadPhoto = () => {
   document.getElementById('upload').click()
}

const cancel = () => {
    dispatch(clearAuthorUpdateStatus())
    dispatch(clearUploadImageStatus())
    dispatch(editAuthorModal(false))
}


return (

<Dialog
fullScreen
open={showAuthorModal}
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
                        onChange={handleChange('id')} value={values.id}/>
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
        
                <Grid item xs={12} md={8} lg={8} xl={8}>
            
                <Item className={classes.inputField} style={{width:"80%"}}>
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
                        value={dateFormat(values.dateOfBirth, 'mm/dd/yyyy')}
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
                            onClick={cancel}
                            style={{minWidth:'100px', height:'40px'}}
                            variant='contained'>Cancel</Button>
                           
                        </Item>

                       
                    </Grid>
                    
                            
                </Grid>
                {authorUpdateStatus.hasOwnProperty('error') ?
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
                                {authorUpdateStatus.error}
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
                    src={Object.keys(uploadImageStatus).length !== 0 && uploadImageStatus.hasOwnProperty('imageUrl')
                        ? uploadImageStatus.imageUrl
                        : Object.keys(authorToEdit).length !== 0 ?
                        `/images/${values.image.includes('/images') ? values.image.split('/')[2] : values.image+'.jpg'}`
                        : 'images/noimgUser.jpg'
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
                {uploadImageStatus.hasOwnProperty('Error') ?
               
               <Typography 
                   variant={'h6'}
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
        
                
            {
                        values.error !== '' ?

                        <Typography 
                        variant='h7' 
                        className={classes.error}>
                        {values.error}
                        </Typography> : null
                    }
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

export default EditAuthor