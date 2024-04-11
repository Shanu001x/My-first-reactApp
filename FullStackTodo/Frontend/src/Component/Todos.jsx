import React from 'react';

function Todos({ todos, onTodoUpdated }) {
  const handleTodoComplete = todo => {
    fetch(`/completed`, {
      method: 'PUT',
      body: JSON.stringify({ id: todo._id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async response => {
        if (response.ok) {
          onTodoUpdated();
        } else {
          alert('Error marking todo as complete');
        }
      })
      .catch(error => {
        console.error('Error marking todo as complete:', error);
        alert('Error marking todo as complete');
      });
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button onClick={() => handleTodoComplete(todo)}>
            {todo.completed ? 'Completed' : 'Mark as complete'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todos;