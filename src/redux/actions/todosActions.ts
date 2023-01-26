import { Dispatch } from "redux";
import { TodoAction } from "../reducer/todosReducer";
import { Todo, TodosActionTypes } from "./todosTypes";

export const getTodos = () => {
  return (dispatch: Dispatch<TodoAction>) => {
    fetch("http://localhost:3003/api/todos")
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: TodosActionTypes.GET_TODOS,
          payload: data,
        })
      )
      .catch((err) => console.log(err));
  };
};

export const addTodo = (todo: string, userId: string, completed: boolean) => {
  return (dispatch: Dispatch<TodoAction>) => {
    fetch("http://localhost:3003/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo,
        userId: userId,
        isCompleted: completed,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: TodosActionTypes.ADD_TODO,
          payload: data,
        })
      );
  };
};

export const completedTodo = (todo: Todo) => {
  return (dispatch: Dispatch<TodoAction>) => {
    fetch("http://localhost:3003/api/todos/" + todo._id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: todo.title,
        userId: todo.userId,
        isCompleted: !todo.isCompleted,
        // isCompleted: true,
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: TodosActionTypes.COMPLETED_TODO,
          payload: data,
        })
      );
  };
};

export const showOnlyCompletedTodos = () => {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: TodosActionTypes.SHOW_ONLY_COMPLETED_TODOS,
    });
  };
};

export const showOnlyActiveTodos = () => {
  return (dispatch: Dispatch<TodoAction>) => {
    dispatch({
      type: TodosActionTypes.SHOW_ONLY_ACTIVE_TODOS,
    });
  };
};

export const deleteTodo = (id: string) => {
  return (dispatch: Dispatch<TodoAction>) => {
    fetch("http://localhost:3003/api/todos/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: TodosActionTypes.DELETE_TODO,
          payload: data,
        })
      );
  };
};
