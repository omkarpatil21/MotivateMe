import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Main from './components/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav></Nav>
      <Main></Main>
    </>
  )
}

export default App
