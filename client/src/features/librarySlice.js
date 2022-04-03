import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

export const login = createAsyncThunk('library/userLoginData', async(userData)=>{
    return await axios.post('/auth/signin', userData,{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(response=>response.data)
    .catch(err=>err)
})

export const logout = createAsyncThunk('library/userLogoutData', async()=>{
    return await axios.post('/auth/signout',{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(response=>response.data)
    .catch(err=>err)
})

export const fetchBooks = createAsyncThunk('library/books', async()=>{
    return await axios.get('/api/books',{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(response=>response.data)
    .catch(err=>err)
})

export const fetchPublishers = createAsyncThunk('library/publishers', async()=>{
    return await axios.get('/api/publishers',{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(response=>response.data)
    .catch(err=>err)
})

export const uploadBookImage = createAsyncThunk('library/uploadImageStatus', async(file)=>{
    return await axios.post('/uploadImage', file)
     .then(response=>response.data)
     .catch(error=>error)
 })

 export const updateBookData = createAsyncThunk('library/updateBookDataStatus', async(book)=>{
    return await axios.put(`/api/books/${book.params}`, book.data, {
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })

  export const addBookData = createAsyncThunk('library/addBookDataStatus', async(book)=>{
    return await axios.post(`/api/books`, book, {
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })

  export const fetchAuthors = createAsyncThunk('library/authors', async()=>{
    return await axios.get('/api/authors',{
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        }
    })
    .then(response=>response.data)
    .catch(err=>err)
})

export const updateAuthorData = createAsyncThunk('library/updateAuthorDataStatus', async(author)=>{
    return await axios.put(`/api/authors/${author.params}`, author.data, {
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })

  export const deleteBook = createAsyncThunk('users/bookToDelete', async(params)=>{
    const response = await axios.delete(`/api/books/${params}`,{
      headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
      },
    })
  return response.data
  })

  export const deleteAuthor = createAsyncThunk('users/authorToDelete', async(params)=>{
    const response = await axios.delete(`/api/authors/${params}`,{
      headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
      },
    })
  return response.data
  })

  export const deletePublisher = createAsyncThunk('users/publisherToDelete', async(params)=>{
    const response = await axios.delete(`/api/publishers/${params}`,{
      headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
      },
    })
  return response.data
  })

  export const updatePublisherData = createAsyncThunk('library/updatePublisherDataStatus', async(publisher)=>{
    return await axios.put(`/api/publishers/${publisher.params}`, publisher.data, {
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })

  export const addPublisherData = createAsyncThunk('library/addPublisherDataStatus', async(publisher)=>{
    return await axios.post(`/api/publishers`, publisher, {
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })

  export const addAuthorData = createAsyncThunk('library/addAuthorDataStatus', async(author)=>{
    return await axios.post(`/api/authors`, author, {
        headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(response=>response.data)
    .catch(error=>error)
  })



const initialState = {
    userLoginData: {},
    userLogoutData: {},
    books:{},
    bookToEdit:{},
    editBookModalStatus:false,
    addBookModalStatus:false,
    publishers:{},
    uploadImageStatus:{},
    updateBookDataStatus:{},
    addBookDataStatus:{},
    authors:{},
    filterForBooks:'',
    filterForAuthors:'',
    authorData:{},
    authorDataModal: false,
    disableAuthorNameField:false,
    editAuthorModalStatus:false,
    updateAuthorDataStatus:{},
    bookData:{},
    authorToEdit:{},
    bookToDelete:{},
    authorToDelete:{},
    publisherToDelete:{},
    authorBooks:{},
    bookDataModal: false,
    filterForPublishers:"",
    publisherDataModal: false,
    editPublisherModalStatus:false,
    updatePublisherDataStatus:{},
    publisherToEdit:{},
    addPublisherDataStatus:{},
    addPublisherModalStatus:false,
    addAuthorDataStatus:{},
    addAuthorModalStatus:false,

}

const librarySlice = createSlice({
    initialState,
    name:'library',
    reducers:{
        resetStore:()=>initialState,
        editBook:(state, action) => {
            state.bookToEdit = Object.values(state.books).filter(item=>item.Id===action.payload)
        },
        editBookModal:(state, action) => {
            state.editBookModalStatus = action.payload
        },
        addBookModal:(state, action) => {
            state.addBookModalStatus = action.payload
        },
        clearUpdateStatus:(state) => {
            state.updateBookDataStatus = {}
        },
        clearAddBookStatus:(state) => {
            state.addBookDataStatus = {}
        },
        filterBooks:(state, action) => {
            state.filterForBooks = action.payload
        },
        filterAuthors:(state, action) => {
            state.filterForAuthors = action.payload
        },
        setAuthorData: (state, action) => {
            state.authorData = action.payload
        },
        setBookData: (state, action) => {
            state.bookData = action.payload
        },
        displayAuthorDataModal:(state, action) => {
            state.authorDataModal = action.payload
        },
        setDisableAuthorNameField: (state, action) => {
            state.disableAuthorNameField = action.payload
        },
        editAuthorModal:(state, action) => {
            state.editAuthorModalStatus = action.payload
        },
        editAuthor:(state, action) => {
            state.authorToEdit = Object.values(state.authors).filter(item=>item.Id===action.payload)
        },
        clearAuthorUpdateStatus: (state, action) => {
            state.updateAuthorDataStatus = {}
        },
        setAuthorBooks: (state, action) => {
            state.authorBooks = action.payload
        },
        displayBookDataModal:(state, action) => {
            state.bookDataModal = action.payload
        },
        filterPublishers:(state, action) => {
            state.filterForPublishers = action.payload
        },
        editPublisherModal:(state, action) => {
            state.editPublisherModalStatus = action.payload
        },
        editPublisher:(state, action) => {
            state.publisherToEdit = Object.values(state.publishers)
            .filter(item=>item.name === action.payload)
        },
        displayPublisherModal: (state, action) => {
            state.editPublisherModalStatus = action.payload
        },
        clearPublisherUpdateStatus: (state, action) => {
            state.updatePublisherDataStatus = {}
        },
        addPublisherModal:(state, action) => {
            state.addPublisherModalStatus = action.payload
        },
        clearAddPublisherData: (state, action) => {
            state.addPublisherDataStatus = {}
        },
        clearUploadImageStatus:(state) => {
            state.uploadImageStatus = {}
        },
        clearAddAuthorStatus:(state) => {
            state.addAuthorDataStatus = {}
        },
        addAuthorModal:(state, action) => {
            state.addAuthorModalStatus = action.payload
        },
    },
    extraReducers:{
        [login.fulfilled]:(state, {payload}) => {
            return {...state, userLoginData: payload}
        },
        [logout.fulfilled]:(state, {payload}) => {
            return {...state, userLogoutData: payload}
        },
        [fetchBooks.fulfilled]: (state, {payload}) => {
            return {...state, books: payload}
        },
        [fetchPublishers.fulfilled]: (state, {payload}) => {
            return {...state, publishers: payload}
        },
        [uploadBookImage.fulfilled]: (state, {payload}) => {
            return {...state, uploadImageStatus: payload}
        },
        [updateBookData.fulfilled]: (state, {payload}) => {
            return {...state, updateBookDataStatus: payload}
        },
        [addBookData.fulfilled]: (state, {payload}) => {
            return {...state, addBookDataStatus: payload}
        },
        [fetchAuthors.fulfilled]: (state, {payload}) => {
            return {...state, authors: payload}
        },
        [updateAuthorData.fulfilled]: (state, {payload}) => {
            return {...state, updateAuthorDataStatus: payload}
        },
        [deleteBook.fulfilled]: (state,{payload}) => {
            return {...state, bookToDelete:payload}
        },
        [deleteAuthor.fulfilled]: (state,{payload}) => {
            return {...state, authorToDelete:payload}
        },
        [deletePublisher.fulfilled]: (state,{payload}) => {
            return {...state, publisherToDelete:payload}
        },
        [updatePublisherData.fulfilled]: (state, {payload}) => {
            return {...state, updatePublisherDataStatus: payload}
        },
        [addPublisherData.fulfilled]: (state, {payload}) => {
            return {...state, addPublisherDataStatus: payload}
        },
        [addAuthorData.fulfilled]: (state, {payload}) => {
            return {...state, addAuthorDataStatus: payload}
        }
    }
})

export const {
    resetStore,         
    editBook,
    editBookModal,
    clearUpdateStatus,
    addBookModal,
    clearAddBookStatus,
    filterBooks,
    filterAuthors,
    filterPublishers,
    setAuthorData,
    displayAuthorDataModal,
    editAuthorModal,
    setBookData,
    setDisableAuthorNameField,
    editAuthor,
    clearAuthorUpdateStatus,
    setAuthorBooks,
    displayBookDataModal,
    editPublisherModal,
    publisherData,
    editPublisher,
    clearPublisherUpdateStatus,
    addPublisherModal,
    clearAddPublisherData,
    clearUploadImageStatus,
    clearAddAuthorStatus,
    addAuthorModal
} = librarySlice.actions

export const getUserLoginData = (state) => state.library.userLoginData
export const getUserLogoutData = (state) => state.library.userLogoutData
export const getBooks = (state) => state.library.books
export const getBookToEdit = (state) => state.library.bookToEdit
export const getEditBookModal = (state) => state.library.editBookModalStatus
export const getAddBookModal = (state) => state.library.addBookModalStatus
export const getPublishers = (state) => state.library.publishers
export const getUploadImageStatus = (state) => state.library.uploadImageStatus
export const getUpdateBookDataStatus = (state) => state.library.updateBookDataStatus
export const getAddBookDataStatus = (state) => state.library.addBookDataStatus
export const getAuthors = (state) => state.library.authors
export const getFilterForBooks = (state) => state.library.filterForBooks
export const getFilterForAuthors = (state) => state.library.filterForAuthors
export const getAuthorData = (state) => state.library.authorData
export const getAuthorDataModalStatus = (state) => state.library.authorDataModal
export const getDisableAuthorNameField = (state) => state.library.disableAuthorNameField
export const getEditAuthorModal = (state) => state.library.editAuthorModalStatus
export const getBookData = (state) => state.library.bookData
export const getUpdateAuthorDataStatus = (state) => state.library.updateAuthorDataStatus
export const getAuthorToEdit = (state) => state.library.authorToEdit
export const getBookToDelete = (state) => state.library.bookToDelete
export const getAuthorToDelete = (state) => state.library.authorToDelete
export const getPublisherToDelete = (state) => state.library.publisherToDelete
export const getAuthorBooks = (state) => state.library.authorBooks
export const getBookDataModal = (state) => state.library.bookDataModal
export const getPublisherToEdit = (state) => state.library.publisherToEdit
export const getFilterForPublishers = (state) => state.library.filterForPublishers
export const getUpdatePublisherDataStatus = (state) => state.library.updatePublisherDataStatus
export const getAddPublisherDataStatus = (state) => state.library.addPublisherDataStatus
export const getPublisherDataModal = (state) => state.library.editPublisherModalStatus
export const getAddPublisherModal = (state) => state.library.addPublisherModalStatus
export const getAddAuthorDataStatus = (state) => state.library.addAuthorDataStatus
export const getAddAuthorModal = (state) => state.library.addAuthorModalStatus

export default librarySlice.reducer