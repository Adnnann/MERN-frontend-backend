import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import OurTeam from './components/OurTeam'
import Footer from './components/core/Footer'
import Login from './components/Login'
import Books from './components/Books'
import EditBook from './components/EditBook'
import AddBook from './components/AddBook'
import DisplayAuthorData from './components/DisplayAuthorData'
import EditAuthor from './components/EditAuthor'
import Authors from './components/Authors'
import DisplayBookData from './components/DisplayBookData'
import Publishers from './components/Publishers'
import EditPublisher from './components/EditPublisher'
import AddPublisher from './components/AddPublisher'
import AddAuthor from './components/AddAuthor'
const MainRouter = () => {
    return(
        <Router>
        <EditBook />
        <AddBook />
        <DisplayAuthorData />
        <EditAuthor />
        <DisplayBookData />
        <EditPublisher />
        <AddPublisher />
        <AddAuthor />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/ourTeam' element={<OurTeam />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/books' element={<Books />}></Route>
                <Route path='/authors' element={<Authors />}></Route>
                <Route path='/publishers' element={<Publishers />}></Route>
            </Routes>
        <Footer />
        </Router>
    )
}

export default MainRouter