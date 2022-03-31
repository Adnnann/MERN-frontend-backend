import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import OurTeam from './components/OurTeam'
import Footer from './components/core/Footer'
import Login from './components/Login'
import Books from './components/Books'
import EditBook from './components/EditBook'
import AddBook from './components/AddBook'
import DisplayAuthorData from './components/DisplayAuthorData'


const MainRouter = () => {
    return(
        <Router>
        <EditBook />
        <AddBook />
        <DisplayAuthorData />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/ourTeam' element={<OurTeam />}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/books' element={<Books />}></Route>
            </Routes>
        <Footer />
        </Router>
    )
}

export default MainRouter