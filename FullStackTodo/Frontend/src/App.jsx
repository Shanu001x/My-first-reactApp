import React, { useState, useEffect } from 'react';
import CreateTodo from './Component/CreateTodo';
import Todos from './Component/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch('/todos')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(error => {
            throw new Error(`Error fetching todos: ${error.message}`);
          });
        }
      })
      .then(data => setTodos(data.todos))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <CreateTodo onTodoCreated={fetchTodos} />
      <Todos todos={todos} onTodoUpdated={fetchTodos} />
    </div>
  );
}

export default App;