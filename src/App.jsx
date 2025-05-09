import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PreCompra from './components/PreCompra'
import HomePage from './pages/HomePage'
import './styles.css'
import Header from './components/Header'
import FormCompra from './components/FormCompra'
function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/compra' element={<PreCompra nombreproducto='Licor de Uva' precio='234.24' />} />
        <Route path='/detalle-compra' element={<FormCompra />} />
      </Routes>
    </>
  )
}

export default App
