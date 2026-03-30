import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={ <Login/> }/>
        <Route path='/' element={ <Login/> }/>
        <Route path='/homePage' element={ <h1>  HOME PAGE DEL SISTEMA </h1> }/>

        {/* -- Ruta por defecto ---*/}
        <Route path='*' element={ <NotFound/> } />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
