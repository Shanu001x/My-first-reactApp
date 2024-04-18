import { useRecoilState} from "recoil";
import "./todoscss.css";
import {
  todosAtom,
  todoIdAtom,
  titleAtom,
  descriptionAtom,
  isCompletingAtom,
  useFetchTodos,
} from "../Store/Atoms/atoms";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";

const API_URL = 'http://localhost:3000'

const Todos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const fetchTodos = useFetchTodos();

  const [todos, setTodos] = useRecoilState(todosAtom);


  const [todoId, settodoId] = useRecoilState(todoIdAtom);
  const [title, settitle] = useRecoilState(titleAtom);
  const [description, setdescription] = useRecoilState(descriptionAtom);
  const [isCompleting, setIsCompleting] = useRecoilState(isCompletingAtom);


    const deleteTodo = async (id) => {
        try {
          await axios.delete(`${API_URL}/todos/delete/${id}`);
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
          fetchTodos()
        } catch (error) {
          console.error('Error deleting todo:', error.message);
        }
      };

const toggleTodoCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/todos/updatetodo/${id}`, {
        completed,
      }); 
      if (response.status === 200) {
        console.log("todos completed runs" )
        fetchTodos()
        
      }
    } catch (error) {
      console.error('Error updating todo completion:', error.message);
      throw error;
    }
  }

  const updateTodo = (id) => {
    if (!title || !description) {
      alert("Please fill all the fields");
      return;
    }
    console.log("clicked on update Todo ", id);
    const data = {
      title,
      description,
    };
    console.log(data);
    editTodo(id, data);
    settitle("");
    setdescription("");
    settodoId(null);

  };

  const handleEdit = (id) => {
    console.log("clicked on Edit Todo ");
    settodoId(id);
    console.log(id);
  };

  const handleComplete = useCallback(
    async (id) => {
      try {
        setIsCompleting((prevStatus) => ({
          ...prevStatus,
          [id]: !prevStatus[id],
        }));

        await toggleTodoCompletion(id, !isCompleting[id]);
      } catch (error) {
        console.error("Error updating todo completion:", error.message);
      }
    },
    [toggleTodoCompletion, isCompleting]
  );

  const editTodo = async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/todos/updatedata/${id}`, {
        title: data.title,
        description: data.description,
      })
      if (response.status === 200) {
        console.log(response.data)
        fetchTodos()
       
      
      }
      
    } catch (error) {
      console.error('Error updating todo:', error.message)
      console.log(id)
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      await fetchTodos();
      setIsLoading(false);
    };

    fetchData();
  }, [fetchTodos, setIsLoading]);

  if (isLoading) {
    return <p>Loading todos...</p>;
  }


  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4">Todolist</h1>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo._id} className="bg-white p-4 rounded shadow">
            <ul className="list-disc list-inside">
              <li
                className={`item ${
                  todo.completed || isCompleting[todo._id] ? "completed" : ""
                }`}
              >
                <b>Title: </b>
                {todoId === todo._id ? (
                  <input
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                    type="text"
                    placeholder="Title"
                    className="w-full px-3 py-2 mb-3 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  todo.title
                )}
              </li>
              <li
                className={`item ${
                  todo.completed || isCompleting[todo._id] ? "completed" : ""
                }`}
              >
                <b>Description: </b>
                {todoId === todo._id ? (
                  <input
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    type="text"
                    placeholder="Description"
                    className="w-full px-3 py-2 mb-3 placeholder-gray-500 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  todo.description
                )}
              </li>
            </ul>

            {todoId === todo._id ? null : (
              <button
                key={todo._id}
                onClick={() => handleComplete(todo._id)}
                className={`complete-btn ${
                  todo.completed || isCompleting[todo._id]
                    ? "completed"
                    : "incompleted"
                }`}
              >
                {todo.completed || isCompleting[todo._id]
                  ? "Completed"
                  : "Incompleted"}
              </button>
            )}

            {todoId === todo._id ? null : (
              <button
                onClick={() => deleteTodo(todo._id)}
                className="remove-btn"
              >
                Remove Todo
              </button>
            )}

            {todoId === todo._id ? (
              <button onClick={() => updateTodo(todo._id)} className="save-btn">
                Save changes
              </button>
            ) : (
              <button
                onClick={() => handleEdit(todo._id)}
                className={`edit-btn`}
              >
                Edit todo
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
