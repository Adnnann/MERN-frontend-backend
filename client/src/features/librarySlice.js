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


const initialState = {
    userLoginData: {},
    userLogoutData: {},
    books:{},
    bookToEdit:{},
    editBookModalStatus:false,
    publishers:{},
    uploadImageStatus:{},
    updateBookDataStatus:{}
}

const librarySlice = createSlice({
    initialState,
    name:'library',
    reducers:{
        resetStore:()=>initialState,
        editBook:(state, action)=>{
            state.bookToEdit = Object.values(state.books).filter(item=>item.Id===action.payload)
        },
        editBookModal:(state, action)=>{
            state.editBookModalStatus = action.payload
        },
        clearUpdateStatus:(state)=>{
            state.updateBookDataStatus = {}
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
        }
    }
})

export const {
              resetStore,
              editBook,
              editBookModal,
              clearUpdateStatus
} = librarySlice.actions

export const getUserLoginData = (state) => state.library.userLoginData
export const getUserLogoutData = (state) => state.library.userLogoutData
export const getBooks = (state) => state.library.books
export const getBookToEdit = (state) => state.library.bookToEdit
export const getEditBookModal = (state) => state.library.editBookModalStatus
export const getPublishers = (state) => state.library.publishers
export const getUploadImageStatus = (state) => state.library.uploadImageStatus
export const getUpdateBookDataStatus = (state) => state.library.updateBookDataStatus

export default librarySlice.reducer