import React, { useState } from 'react';

function CreateTodo({ onTodoCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTodo = () => {
    fetch('http://localhost:3000/todo', {
      method: 'POST',
      body: JSON.stringify({
         title: title, 
         description: description
         }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async response => {
        if (response.ok) {
          onTodoCreated();
          setTitle('');
          setDescription('');
          alert('Todo added');
        } else {
          alert('Error creating todo');
        }
      })
      .catch(error => {
        console.error('Error creating todo:', error);
        alert('Error creating todo');
      });
  };

  return (
    <div>
      <input
        id="title"
        onChange={e => setTitle(e.target.value)}
        style={{ margin: 10, padding: 10 }}
        type="text"
        placeholder="title"
        value={title}
      />
      <br />
      <input
        id="desc"
        onChange={e => setDescription(e.target.value)}
        style={{ margin: 10, padding: 10 }}
        type="text"
        placeholder="description"
        value={description}
      />
      <br />
      <br />
      <button onClick={handleCreateTodo} style={{ margin: 10, padding: 10 }}>
        Add a todo
      </button>
    </div>
  );
}

export default CreateTodo;