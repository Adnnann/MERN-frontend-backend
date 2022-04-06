import BooksHeader from "./core/BooksHeader"
import { 
        getUserLoginData,
        getPublishers,
        getFilterForPublishers,
        getPublisherToDelete,
        fetchPublishers,
        editPublisher,
        editPublisherModal,
        filterPublishers,
        deletePublisher,
        addPublisherModal,
        userToken,
        getToken,
        resetStore
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
import _ from 'lodash'
import { useNavigate } from "react-router"
import jwtDecode from "jwt-decode";


const Publishers = () => {

  const dispatch = useDispatch()
  const userData = useSelector(getUserLoginData)
  const userRole = userData.user ? userData.user.role : ''
  const publishers = useSelector(getPublishers)
  const filterForPublishers = useSelector(getFilterForPublishers)
  const deletePublisherStatus = useSelector(getPublisherToDelete)
  const token = useSelector(getToken)
  const navigate = useNavigate()

  useEffect(()=>{

    
    dispatch(userToken())
    //In case user tried to visit url /protected without token, redirect 
    //to signin page
    if(token === 'Request failed with status code 500' 
        || token ==='Request failed with status code 401'){
        dispatch(resetStore())
        navigate('/')
    }
    
    dispatch(fetchPublishers())
    
    if(deletePublisherStatus.hasOwnProperty('message')){
      dispatch(fetchPublishers())
    }


  },[dispatch, deletePublisherStatus, token.length])


  //define table columns for displaying books
  const columns = [
    { 
        id: 'id', 
        label: 'ID', 
        minWidth: 10,
        align:'center'
    },
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'), 
    },
    {
        id: 'country',
        label: 'Country',
        minWidth: 100,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
      },
      //if user admin => display add column (for adding, editing and deleting books) 
      //else don't
      token.hasOwnProperty('message') && jwtDecode(token.message).role === 'admin' ?
      { 
        id: 'edit',
        label:<Tooltip title='Add book'>
                  <AddCircleIcon onClick={()=>dispatch(addPublisherModal(true))} />
              </Tooltip>,
        minWidth: 60,
        align: 'left',
        
      }:
      {

      }
  ];

  
const createDataPublishers = (id, name, country, edit) => {
  return {id, name, country, edit}
}


const createRowsPublishers = () =>{

  if(Object.keys(publishers).length !== 0){

    publishers.filter(item=>item.name.includes(filterForPublishers))
    .map(item=>{

      const firstCol = <div>{item.Id}</div>
      const secondCol = <div>{item.name}</div>
      const thirdCol =<span>{item.country}</span> 
      const fourthCol = <span> 
                            <Tooltip title="Edit book">
                              <EditOutlinedIcon fontSize='small' onClick={()=>edit(item.name)}/>
                            </Tooltip>
                            
                            <Tooltip title='Delete book'>
                              <DeleteOutlineOutlinedIcon onClick={()=>remove(item._id)} fontSize='small' />
                            </Tooltip>
                          </span>
    
        rows.push(createDataPublishers(firstCol, secondCol, thirdCol, fourthCol)) 
    })
  }
}

  const rows = [];

  const edit = (name) => {

    dispatch(editPublisher(name))
    dispatch(editPublisherModal(true))
  }

  const remove = (id) => {
    dispatch(deletePublisher(id))
  }

  const filter = (e) => {
    dispatch(filterPublishers(e.target.value))
  }


  return (
    <>
    <BooksHeader />
    
      <Grid container justifyContent={'center'}>

          <Grid item xs={12} md={6} lg={6} xl={6}>

          <Typography variant="h3" textAlign={'left'} marginLeft={'30%'}>
            Publishers
          </Typography>

        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>

          <FilterBooks 
            filter={filter}
          />

        </Grid>

        <Grid item xs={12} md={9} lg={9} xl={9} style={{marginTop:'10px'}}>
            <TableComponent
              createData={createDataPublishers}
              createRows={createRowsPublishers}
              rows={rows}
              columns={columns}
            />
        </Grid>
     
  </Grid>
  </>
  );  
}

export default Publishers