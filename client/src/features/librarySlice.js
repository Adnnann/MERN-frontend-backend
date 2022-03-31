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
    authorData:{},
    authorDataModal: false
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
        setAuthorData: (state, action) => {
            state.authorData = action.payload
        },
        displayAuthorDataModal:(state, action) => {
            state.authorDataModal = action.payload
        }
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
    setAuthorData,
    displayAuthorDataModal
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
export const getAuthorData = (state) => state.library.authorData
export const getAuthorDataModalStatus = (state) => state.library.authorDataModal

export default librarySlice.reducer