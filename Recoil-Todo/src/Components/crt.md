import React, { useState } from 'react'
import {useFetchTodos} from '../Store/Atoms/atoms'


function CreateTodo() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const fetchTodos = useFetchTodos()

  const handleclick = () => {
    if (title.length < 1 || description.length < 1) {
      alert('Todo can not be empty')
      return
    }

    fetch('http://localhost:3000/todo', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          setTitle('')
          setDescription('')
          fetchTodos()
         
        } else {
          throw new Error('Failed to create todo')
        }
      })
      .catch((error) => {
        if (error.name === 'Error') {
          alert('Todo not created')
        } else {
          console.error(error)
        }
      })
  }

  return (
    <div className="p-4 flex flex-col justify-center">
      <input
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
        }}
        type="text"
        placeholder="Title"
        className="w-full px-3 py-2 mb-3 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <br />
      <input
        value={description}
        onChange={(e) => {
          setDescription(e.target.value)
        }}
        type="text"
        placeholder="Description"
        className="w-full px-3 py-2 mb-3 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      <br />
      <br />
      <button
        onClick={handleclick}
        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-indigo-500 mx-auto"
      >
        Create Todo
      </button>
    </div>
  )
}

export default CreateTodo