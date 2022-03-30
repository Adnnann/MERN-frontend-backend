import BooksHeader from "./core/BooksHeader"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { 
        editBookModal, 
        getBooks
} from '../features/librarySlice';
import { useSelector, useDispatch } from 'react-redux';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import FilterBooks from "./FilterBooks";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from "@mui/material";
import { editBook } from "../features/librarySlice";
import { 
        getUserLoginData,
        fetchPublishers
} from "../features/librarySlice";
import { useEffect } from "react";


const Books = () => {

  const dispatch = useDispatch()
  const userData = useSelector(getUserLoginData)
  const userRole = userData.user ? userData.user.role : ''
  const books = useSelector(getBooks)

  useEffect(()=>{
    dispatch(fetchPublishers())
  },[])


  //define table columns
  const columns = [
    { 
        id: 'id', 
        label: 'ID', 
        minWidth: 10,
        align:'center'
    },
    { 
        id: 'title', 
        label: 'Title', 
        minWidth: 60,
        align:'left'
    },
    {
      id: 'pages',
      label: 'Pages',
      minWidth: 10,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'), 
    },
    {
        id: 'price',
        label: 'Price',
        minWidth: 40,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'), 
      },

      Object.keys(userData).length !== 0 && userRole === 'admin' ?
      { 
        id: 'edit',
        label:<a href="">Add</a>,
        minWidth: 60,
        align: 'left',
        
      }:
      {

      }
  ];

  
  function createData(id, title, pages, price, edit) {
      return { id, title, pages, price, edit};
    
  }

  const rows = [];

  const edit = (id) => {

    dispatch(editBook(id))
    dispatch(editBookModal(true))
  }

  const deleteBook = (id) => {
    alert('clicked on delete')
    //dispatch(setDeleteId(id))
  }

     if(Object.keys(books).length !== 0){
        books.map(item=>{
              const firstCol = <div>{item.Id}</div>

              const secondCol = <div>{item.Title}</div>

              const thirdCol =<span>{item.Pages}</span> 

              const fourthCol =<span>{item.Price}</span> 
    
        
                const fifthCol = <span> 
                  <EditOutlinedIcon fontSize='small' onClick={()=>edit(item.Id)}/>
                  <DeleteOutlineOutlinedIcon onClick={()=>deleteBook(item._id)} fontSize='small' />
                 </span>
              
                  // add third row (remove and edit buttons)
                rows.push(createData(firstCol, secondCol, thirdCol, fourthCol, fifthCol)) 
                 
             
           
          // generate rows 
           
          
        })
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

    <TextField 
    onChange={(e)=>console.log(e.target.value)}
    InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        variant='standard'
    style={{borderStyle:'solid', borderWidth:'1px', marginTop:'10px',
    borderColor:'grey', borderRadius:'15px', paddingLeft:'5px'}}/>

    </Grid>

    <Grid item xs={12} md={9} lg={9} xl={9} style={{marginTop:'10px'}}>

    <Paper sx={{ width: '100%', overflow: 'hidden', overflowX:"none" }}>
    { Object.keys(books).length == 0  ?
    'Start adding books'
    : Object.keys(books).length !== 0 ?
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                
                <TableCell
                  key={Math.random()*100}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor:'grey' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row, index) => {
                return (
                  <TableRow style={{padding: '0 !important', height:'90px', wordBreak:"break"}} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={Math.random() * 10} align={column.align} style={{wordBreak:'break-all'}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    : ''} 
    </Paper> 
</Grid>
    </Grid>
    </>
  );  
}

export default Books