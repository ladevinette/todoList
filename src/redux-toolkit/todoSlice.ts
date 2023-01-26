import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AsyncThunk,
} from "@reduxjs/toolkit";
import { stat } from "fs";
import { Todo } from "../redux/actions/todosTypes";
import todoService from "./todoService";

type State = {
  data: Todo[] | null;
  error: null | string;
  isSuccess: boolean;
  isLoading: boolean;
  activeTodo: Todo[];
};

const initialState: State = {
  data: null,
  error: null,
  isSuccess: false,
  isLoading: false,
  activeTodo: [],
};

export const getTodoss = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkApi) => {
    try {
      return await todoService.getTodoss();
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const deleteTodoss = createAsyncThunk(
  "todos/deleteTodos",
  async (id: string, thunkApi) => {
    try {
      return await todoService.deleteTodoss(id);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const addTodoss = createAsyncThunk(
  "todos/addTodos",
  async (todo: Omit<Todo, "_id">, thunkApi) => {
    const { title, userId, isCompleted } = todo;
    try {
      return await todoService.addTodoss(title, userId, isCompleted);
    } catch (e: any) {
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

export const doneTodoss = createAsyncThunk(
  "todos/doneTodos",
  async (todo: Todo, thunkApi) => {
    try {
      return await todoService.doneTodoss(todo);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodoss.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodoss.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.activeTodo = state.data.filter((element) => !element.isCompleted);
      })
      .addCase(getTodoss.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = null;
      })
      .addCase(deleteTodoss.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodoss.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.data) {
          const deletedTodo = action.payload;
          const ListAfterDeleteTodo = [...state.data].filter(
            (todo) => todo._id !== deletedTodo._id
          );
          state.data = ListAfterDeleteTodo;
          state.activeTodo = ListAfterDeleteTodo.filter(
            (element) => !element.isCompleted
          );
        }
      })
      .addCase(deleteTodoss.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload;
      })
      .addCase(addTodoss.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodoss.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.data) {
          const List = [...state.data];
          const newTodo = action.payload;
          List.push(newTodo);
          state.data = List;
          state.activeTodo = List.filter((element) => !element.isCompleted);
        }
      })
      .addCase(addTodoss.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(doneTodoss.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doneTodoss.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.data) {
          const todoList = [...state.data];
          const editedTodo = action.payload;
          const index = todoList.findIndex(
            (item) => item._id === editedTodo._id
          );
          if (index >= 0) {
            todoList[index].isCompleted = editedTodo.isCompleted;
          }
          state.data = todoList;
          state.activeTodo = todoList.filter((element) => !element.isCompleted);
        }
      })
      .addCase(doneTodoss.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default todoSlice.reducer;
