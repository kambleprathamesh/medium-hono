
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Signin from './Pages/Signin'
import { Toaster } from 'react-hot-toast'
import { Blogs } from './Pages/Blogs'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/blogs' element={<Blogs />} />
      </Routes>
      <Toaster />
    </BrowserRouter>

  )
}

export default App
