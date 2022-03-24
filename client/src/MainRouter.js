import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/core/Header'
import Home from './components/Home'

const MainRouter = () => {
    return(
        <Router>
        <Header />  
            <Routes>
                <Route path='/' element={<Home />}></Route>
            </Routes>

        </Router>
    )
}

export default MainRouter