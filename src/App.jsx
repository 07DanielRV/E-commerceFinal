import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import Purchases from './pages/Purchases'
import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'
import { Container } from 'react-bootstrap'

function App() {
  const [count, setCount] = useState(0)

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter >
      <AppNavbar/>
      { isLoading && <LoadingScreen />}
      <Container className='my-4'>
      <Routes >
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/login' element={<Login/>} />

        <Route element={<ProtectedRoutes/>}>
          
        <Route path='purchases' element={<Purchases/>}/>

        </Route>
      </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
