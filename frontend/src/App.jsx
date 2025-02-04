import { useState } from 'react'
import Login from './page/auth/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
    </>
  )
}

export default App
