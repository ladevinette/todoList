import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { todosReducer } from "../reducer/todosReducer";

export const todosStore = createStore(todosReducer, applyMiddleware(thunk));
