import BooksHeader from "./core/BooksHeader"
import { 
        editAuthor,
        editAuthorModal,
        filterAuthors, 
        getAuthors, 
        getBooks,
        getFilterForAuthors,
        getUserLoginData,
        deleteAuthor,
        fetchAuthors,       
        getAuthorToDelete,
        setAuthorBooks,
        addAuthorModal,
        getToken,
        userToken,
        resetStore,
} from '../features/librarySlice';
import { useSelector, useDispatch } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CardMedia, Grid, Typography } from "@mui/material";
import FilterBooks from "./SearchFilters";
import { useEffect } from "react";
import TableComponent from "./TableComponent";
import { Tooltip } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dateFormat from 'dateformat'
import _ from 'lodash'
import { useNavigate } from "react-router"
import jwtDecode from 'jwt-decode'


const Authors = () => {

  const dispatch = useDispatch()
  const userData = useSelector(getUserLoginData)
  const userRole = userData.user ? userData.user.role : ''
  const books = useSelector(getBooks)
  const authors = useSelector(getAuthors)
  const filterForAuthors = useSelector(getFilterForAuthors)
  const deleteAuthorStatus = useSelector(getAuthorToDelete)
  const token = useSelector(getToken)
  const navigate = useNavigate()
  

  useEffect(()=>{

    dispatch(fetchAuthors())
    dispatch(userToken())
    //In case user tried to visit url /protected without token, redirect 
    //to signin page
    if(token === 'Request failed with status code 500' 
        || token ==='Request failed with status code 401'){
        dispatch(resetStore())
        navigate('/')
    }
    
    
    
    if(deleteAuthorStatus.hasOwnProperty('message')){
      dispatch(fetchAuthors())
    }


  },[dispatch, deleteAuthorStatus, token.length])

  

  //define table columns for displaying books
  const columns = [
    { 
        id: 'id', 
        label: 'ID', 
        minWidth: 20,
        align:'center'
    },
    { 
        id: 'image', 
        label: 'Image', 
        maxWidth: 60,
        align:'left'
    },
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'), 
    },
    {
        id: 'dob',
        label: 'DoB',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
      },
      {
        id: 'email',
        label: 'Email',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('en-US') 
      },
      //if user is admin display add column (for adding, editing and deleting books) 
       token.hasOwnProperty('message') && jwtDecode(token.message).role === 'admin' ?
      { 
        id: 'edit',
        label:<Tooltip title='Add book'>
                  <AddCircleIcon onClick={()=>dispatch(addAuthorModal(true))} />
              </Tooltip>,
        minWidth: 60,
        align: 'left',
        
      }:
      {
        minWidth: 0
      }
  ];

  
const createDataAuthors = (id, image, name, dob, email, edit) => {
  return {id, image, name, dob, email, edit}
}


const createRowsAuthors = () =>{

  if(Object.keys(authors).length !== 0){

    authors.filter(item=>item.Name.includes(filterForAuthors))
    .map(item=>{

      let date = dateFormat(new Date(item.Birthday),"dd/mm/yyyy")
      
      const firstCol = <div>{item.Id}</div>
      const secondCol = <div><CardMedia
      style={{maxWidth:'120px', maxHeight:"60px"}}
       component={'img'} src={item.Image.includes('/') ? item.Image : `/images/${item.Image}.jpg`}></CardMedia></div>
      const thirdCol =<span>{item.Name}</span> 
      const fourthCol =<span>{date}</span> 
      const fifthCol =<span>{item.Email}</span> 
      const sixthCol = <span> 
                            <Tooltip title="Edit book">
                              <EditOutlinedIcon fontSize='small' onClick={()=>edit(item.Id, item.Name)}/>
                            </Tooltip>
                            
                            <Tooltip title='Delete book'>
                              <DeleteOutlineOutlinedIcon onClick={()=>dispatch(deleteAuthor(item._id))} fontSize='small' />
                            </Tooltip>
                          </span>
    
        rows.push(createDataAuthors(firstCol, secondCol, thirdCol, fourthCol, fifthCol, sixthCol)) 
    })
  }
}

  const rows = [];

  const edit = (id, name) => {

    dispatch(editAuthor(id))
    dispatch(editAuthorModal(true))

    let arr = []
    //when user selects an book from the table
    //get only data for selected book
    Object.values(books).map(item=>{
      if(item.Author.includes(name)){
        arr.push(item)
    }
  })
  dispatch(setAuthorBooks(arr))
  }
  //filtering is done as soon as user starts enterin data in 
  //search field
  const filter = (e) => {
    dispatch(filterAuthors(e.target.value))
  }


  return (
    <>
    <BooksHeader />
    
      <Grid container justifyContent={'center'}>

          <Grid item xs={12} md={6} lg={6} xl={6}>

          <Typography variant="h3" textAlign={'left'} marginLeft={'30%'}>
            Authors
          </Typography>

        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>

          <FilterBooks 
            filter={filter}
          />

        </Grid>

        <Grid item xs={12} md={9} lg={9} xl={9} style={{marginTop:'10px'}}>
            <TableComponent
              createData={createDataAuthors}
              createRows={createRowsAuthors}
              rows={rows}
              columns={columns}
            />
        </Grid>
     
  </Grid>
  </>
  );  
}

export default Authors