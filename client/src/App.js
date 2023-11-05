import {Routes,Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import ProductPage from './components/ProductPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>

      </Routes>
      
    </div>
  )
}

export default App
