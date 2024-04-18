import React, { useCallback, useEffect } from "react";
import CreateTodo from "./CreateTodo";
import Todos from "./Todos";
import {useFetchTodos} from '../Store/Atoms/atoms'

function ParentTodo() {
  
  const fetchTodos = useFetchTodos()

  const handleFetchTodos = useCallback(() => {

    fetchTodos();

  }, [fetchTodos]);

  useEffect(() => {
    handleFetchTodos();
  }, []);

  return (

    <div className="bg-gray-900 text-black min-h-screen flex flex-col items-center">
      <div className="w-full max-w-2xl p-4">
        <CreateTodo />
        <Todos />
      </div>
    </div>
  );
}

export default ParentTodo;
