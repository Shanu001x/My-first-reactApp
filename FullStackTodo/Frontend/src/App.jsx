import React, { useState } from 'react'
import CreateTodo from './Component/CreateTodo'
import Todos from './Component/Todos'


function App() {
  const [todos, setTodos] = useState([])

  return (
    <div>
      <CreateTodo />
      <Todos todos={[
        {
          title: "i am a boy",
          description: "i am a good boy",
          completed: false
        }
      ]} />
    </div>
  )
}

export default App