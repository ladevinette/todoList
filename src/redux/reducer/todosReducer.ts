import { Todo, TodosActionTypes } from "../actions/todosTypes";

export type TodosState = {
  todos: Todo[];
  activeTodos: Todo[];
};

export type TodoAction =
  | { type: TodosActionTypes.GET_TODOS; payload: Todo[] }
  | { type: TodosActionTypes.ADD_TODO; payload: Todo }
  | { type: TodosActionTypes.COMPLETED_TODO; payload: Todo }
  | { type: TodosActionTypes.SHOW_ONLY_COMPLETED_TODOS }
  | { type: TodosActionTypes.SHOW_ONLY_ACTIVE_TODOS }
  | { type: TodosActionTypes.DELETE_TODO; payload: Todo };

export type Action = TodoAction;

const initialState = {
  todos: [],
  activeTodos: [],
};

export const todosReducer = (
  state: TodosState = initialState,
  action: Action
): TodosState => {
  switch (action.type) {
    case TodosActionTypes.GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        activeTodos: state.todos.filter((element) => !element.isCompleted),
      };

    case TodosActionTypes.ADD_TODO:
      const todosList = [...state.todos];
      const newTodo = action.payload;
      todosList.push(newTodo);
      return {
        ...state,
        todos: todosList,
        activeTodos: todosList.filter((element) => !element.isCompleted),
      };

    case TodosActionTypes.COMPLETED_TODO:
      const todoList = [...state.todos];
      const editedTodo = action.payload;
      const index = todoList.findIndex((item) => item._id === editedTodo._id);
      if (index >= 0) {
        todoList[index].isCompleted = editedTodo.isCompleted;
      }
      return {
        ...state,
        todos: todoList,
        activeTodos: todoList.filter((element) => !element.isCompleted),
      };

    // case TodosActionTypes.SHOW_ONLY_COMPLETED_TODOS:
    //   const todosList = [...state.todos];
    //   const onlyCompletedTodos = todosList.filter(
    //     (element) => element.isCompleted
    //   );
    //   return {
    //     ...state,
    //     activeTodos: onlyCompletedTodos
    //   };

    case TodosActionTypes.SHOW_ONLY_ACTIVE_TODOS:
      return {
        ...state,
        activeTodos: state.todos.filter((element) => !element.isCompleted),
        //pozmieniac statty active w kazdym przypadku bo sie zmienija
      };

    case TodosActionTypes.DELETE_TODO:
      const deletedTodo = action.payload;
      const ListAfterDeleteTodo = [...state.todos].filter(
        (todo) => todo._id !== deletedTodo._id
      );

      return {
        ...state,
        todos: ListAfterDeleteTodo,
        // activeTodos: state.todos.filter((element) => !element.isCompleted),
        activeTodos: ListAfterDeleteTodo.filter(
          (element) => !element.isCompleted
        ),
      };

    default:
      return state;
  }
};
