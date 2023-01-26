export type Todo = {
  _id: string;
  title: string;
  userId: string;
  isCompleted: boolean;
};

export enum TodosActionTypes {
  GET_TODOS = "GET_TODOS",
  ADD_TODO = "ADD_TODO",
  DELETE_TODO = "DELETE_TODO",
  COMPLETED_TODO = "COMPLETED_TODO",
  SHOW_ONLY_COMPLETED_TODOS = "SHOW_ONLY_COMPLETED_TODOS",
  SHOW_ONLY_ACTIVE_TODOS = "SHOW_ONLY_ACTIVE_TODOS",
}
