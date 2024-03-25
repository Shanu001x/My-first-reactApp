import { useState } from 'react'
import UserContextprovider from './Context/UserContextProvider'
import Login from './Components/login'
import Profile from './Components/Profile'

function App() {


  return (
    <UserContextprovider>
      <h1>Welcome  to our app! in Context Api</h1>
      <Login/>
      <Profile/>
    </UserContextprovider>
  )
}

export default App
