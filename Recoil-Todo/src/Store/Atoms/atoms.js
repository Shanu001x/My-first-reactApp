import {atom, useSetRecoilState} from 'recoil'
import axios from "axios";
import { useCallback } from 'react';


const API_URL = 'http://localhost:3000'

export const todosAtom = atom({
    key: 'todos',
    default: []
})

export const todoIdAtom = atom({
  key: 'todoId',
  default: null
})

export const titleAtom = atom({
  key: 'title',
  default: ''
})

export const descriptionAtom = atom({
  key: 'description',
  default: ''
})

export const isCompletingAtom  = atom({
  key: 'isCompleting',
  default: {}
})


export const useFetchTodos = () => {
    const setTodos = useSetRecoilState(todosAtom)
    
const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`)
      setTodos(response.data.todoslist)
    } catch (error) {
      console.error('Error fetching todos:', error.message)
    }
  }, [setTodos])

  return fetchTodos

}

