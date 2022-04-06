import BooksHeader from "./core/BooksHeader"
import { 
        addBookModal,
        editBookModal, 
        fetchAuthors, 
        getBooks,
        getFilterForBooks,
        deleteBook,
        getBookToDelete,
        fetchBooks,
        getUserLoginData,
        fetchPublishers,
        filterBooks,
        editBook,
        resetStore,
        getToken,
        userToken,
} from '../features/librarySlice';
import { useSelector, useDispatch } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Grid, Typography } from "@mui/material";
import FilterBooks from "./SearchFilters";
import { useEffect } from "react";
import TableComponent from "./TableComponent";
import { Tooltip } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router"
import jwtDecode from 'jwt-decode'

const Books = () => {

  const dispatch = useDispatch()
  const userData = useSelector(getUserLoginData)
  const books = useSelector(getBooks)
  const filterForBooks = useSelector(getFilterForBooks)
  const deleteBookStatus = useSelector(getBookToDelete)
  const token = useSelector(getToken)
  const userLoginData = useSelector(getUserLoginData)
  const navigate = useNavigate()

  useEffect(()=>{

    

    dispatch(userToken())

    //In case user tried to visit url /protected without token, redirect 
    //to signin page
    if(Object.keys(userLoginData).length === 0){
   
    if(token === 'Request failed with status code 500' 
        || token ==='Request failed with status code 401'){
        //dispatch(resetStore())
        navigate('/')
    }
    }

    dispatch(fetchBooks())
    
    dispatch(fetchPublishers())
   ///dispatch(fetchAuthors())

    if(deleteBookStatus.hasOwnProperty('message')){
      dispatch(fetchBooks())
    }


  },[dispatch, token.length, deleteBookStatus])


  //define table columns for displaying books
  const columns = [
    { 
        id: 'id', 
        label: 'ID', 
        minWidth: 20,
        align:'center'
    },
    { 
        id: 'title', 
        label: 'Title', 
        minWidth: 100,
        align:'left'
    },
    {
      id: 'pages',
      label: 'Pages',
      minWidth: 10,
      align: 'left',
      format: (value) => value.toFixed(2), 
    },
    {
        id: 'price',
        label: 'Price',
        minWidth: 40,
        align: 'left',
        format: (value) => value.toFixed(2), 
      },
      //if user admin => display add column (for adding, editing and deleting books) 
      //else don't
      token.hasOwnProperty('message') && jwtDecode(token.message).role === 'admin' ?
      { 
        id: 'edit',
        label:<Tooltip title='Add book'>
                  <AddCircleIcon onClick={()=>dispatch(addBookModal(true))} />
              </Tooltip>,
        minWidth: 60,
        align: 'left',
        
      }:
      {

      }
  ];

  
const createDataBooks = (id, title, pages, price, edit) => {
  return {id, title, pages, price, edit}
}


const createRowsBooks = () =>{

  if(Object.keys(books).length !== 0){

    books.filter(item=>item.Title.includes(filterForBooks))
    .map(item=>{

      const firstCol = <div>{item.Id}</div>
      const secondCol = <div>{item.Title}</div>
      const thirdCol =<span>{item.Pages}</span> 
      const fourthCol =<span>{Number(item.Price).toFixed(2)}</span> 
      const fifthCol = <span> 
                            <Tooltip title="Edit book">
                              <EditOutlinedIcon fontSize='small' onClick={()=>edit(item.Id)}/>
                            </Tooltip>
                            
                            <Tooltip title='Delete book'>
                              <DeleteOutlineOutlinedIcon onClick={()=>dispatch(deleteBook(item._id))} fontSize='small' />
                            </Tooltip>
                          </span>
      
          // add third row (remove and edit buttons)
        rows.push(createDataBooks(firstCol, secondCol, thirdCol, fourthCol, fifthCol)) 
    })
  }
}

  const rows = [];

  const edit = (id) => {

    dispatch(editBook(id))
    dispatch(editBookModal(true))
  }

  const addBook = () => {
    dispatch(addBookModal(true))
  }

  const filter = (e) => {
    dispatch(filterBooks(e.target.value))
  }

  return (
    <>
    <BooksHeader />
    <Grid container justifyContent={'center'}>

    <Grid item xs={12} md={6} lg={6} xl={6}>

    <Typography variant="h3" textAlign={'left'} marginLeft={'30%'}>
        Books
    </Typography>

    </Grid>

    <Grid item xs={12} md={6} lg={6} xl={6}>

    <FilterBooks 
      filter={filter}
    />

    </Grid>

    <Grid item xs={12} md={9} lg={9} xl={9} style={{marginTop:'10px'}}>
        <TableComponent
          createData={createDataBooks}
          createRows={createRowsBooks}
          rows={rows}
          columns={columns}
        />
    </Grid>
     
  </Grid>
  </>
  );  
}

export default Books