import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PreCompra from './components/PreCompra'
import HomePage from './pages/HomePage'
import './styles.css'
import Header from './components/Header'
import FormCompra from './components/FormCompra'
import VinosPages from './pages/VinosPages'
import Registro from './components/Registro'
import Login from './components/Login'
import CartPage from './pages/CartPage'
import Footer from './components/footer'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/formCompra' element={<FormCompra />} />
        <Route path='/vinos' element={<VinosPages />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/login' element={<Login />} />
        <Route path='/preCompra/:idVino' element={<PreCompra />} />
        <Route path='/carrito' element={<CartPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
