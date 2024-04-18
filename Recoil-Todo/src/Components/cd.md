import { useRecoilState, useRecoilValue , useSetRecoilState} from "recoil";
import "./todoscss.css";
import {
  todosAtom,
  useDeleteTodo,
  useEditTodos,
  useToggleCompletion,
  todoIdAtom,
  titleAtom,
  descriptionAtom,
  isCompletingAtom,
  useFetchTodos,
} from "../Store/Atoms/atoms";
import { useCallback, useState, useEffect } from "react";

const Todos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const fetchTodos = useFetchTodos();

  const todos = useRecoilValue(todosAtom);
  const deleteTodo = useDeleteTodo();
  const editTodo = useEditTodos();
  const toggleTodoCompletion = useToggleCompletion();

  const [todoId, settodoId] = useRecoilState(todoIdAtom);
  const [title, settitle] = useRecoilState(titleAtom);
  const [description, setdescription] = useRecoilState(descriptionAtom);
  const [isCompleting, setIsCompleting] = useRecoilState(isCompletingAtom);


    useEffect(() => {
      const fetchData = async () => {
        await fetchTodos();
        setIsLoading(false);
      };

      fetchData();
    }, [fetchTodos, setIsLoading]);

    const handleDeleteTodo = async (id) => {
        try {
          await deleteTodo(id);
        } catch (error) {
          console.error('Error deleting todo:', error.message);
        }
      };

  const handleToggleCompletion = useCallback(
    (id, completed) => {
      toggleTodoCompletion(id, completed);
      fetchTodos()
    },
    
    [toggleTodoCompletion]
  );

  const handleEditTodo = useCallback(
    (id, data) => {
      editTodo(id, data);
      
    },
    [editTodo]
  );

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
    handleEditTodo(id, data);
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

        await handleToggleCompletion(id, !isCompleting[id]);
      } catch (error) {
        console.error("Error updating todo completion:", error.message);
      }
    },
    [handleToggleCompletion, isCompleting]
  );

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
                onClick={() => handleDeleteTodo(todo._id)}
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
