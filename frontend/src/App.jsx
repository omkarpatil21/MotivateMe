import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import Navbar from './components/Nav'
import Main from './components/Main'
import CreateCohort from './components/CreateCohort'
import { Signin } from './components/Signin'
import {Signup} from './components/Signup'
import { useEffect, useState } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=>{
    if (localStorage.token) {
      setIsAuthenticated(true);
  }
  })
  return (
    <>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}></Navbar>
          <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated}/>}></Route>
            <Route path="/signin" element={<Signin setIsAuthenticated={setIsAuthenticated}/>}></Route>
            <Route path="/main" element={<Main/>}></Route>
            <Route path="/create-cohort" element={<CreateCohort />} />
            {/* <Route path="/join-cohort" element={<JoinCohort />} /> */}
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
