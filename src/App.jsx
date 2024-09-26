import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import EditUser from './components/EditUser'

import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/edit/:id' element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
