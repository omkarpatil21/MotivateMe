import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import Navbar from './components/Nav'
import Main from './components/Main'
import { Signin } from './components/Signin'
import {Signup} from './components/Signup'
import { useState } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}></Navbar>
          <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated}/>}></Route>
            <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated}/>}></Route>
            <Route path="/main" element={<Main/>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
