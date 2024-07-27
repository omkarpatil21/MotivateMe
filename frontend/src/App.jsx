import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import Navbar from './components/Nav'
import Main from './components/Main'
import { Signin } from './components/Signin'
import {Signup} from './components/Signup'
function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/main" element={<Main/>}></Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
