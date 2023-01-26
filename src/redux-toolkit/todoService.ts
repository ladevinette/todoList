import axios from "axios";
import { Todo } from "../redux/actions/todosTypes";

const API_URL = "http://localhost:3003/api/todos";

const getTodoss = async () => {
  const response = await axios.get(API_URL);
  if (response.data) {
    return response.data;
  }
};

const deleteTodoss = async (id: string) => {
  const response = await axios.delete(API_URL + `/${id}`);
  if (response.data) {
    console.log(response.data);
    console.log(API_URL + `/${id}`);
    return response.data;
  }
};

const addTodoss = async (
  title: string,
  userId: string,
  isCompleted: boolean
) => {
  const newTodo = { title, userId, isCompleted };
  const response = await axios.post(API_URL, newTodo);
  console.log(response);
  if (response.data) {
    return response.data;
  }
};

const doneTodoss = async (todo: Todo) => {
  const response = await axios.put(API_URL + `/${todo._id}`, {
    title: todo.title,
    userId: todo.userId,
    isCompleted: !todo.isCompleted,
  });
  if (response.data) {
    return response.data;
  }
};

const todoService = {
  getTodoss,
  deleteTodoss,
  addTodoss,
  doneTodoss,
};

export default todoService;
