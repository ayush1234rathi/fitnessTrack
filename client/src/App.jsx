import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-4xl mb-4'>Your Fitness Tracker</h1>
      <p>This is just the setup </p>
    </>
  )
}

export default App
