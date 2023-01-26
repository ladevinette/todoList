import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "../context/UserAuthContext";
import { TodosState } from "../redux/reducer/todosReducer";
import Paper from "@mui/material/Paper";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/actions";
import { IconCross } from "./IconCross";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux-toolkit/hooks/useTypedSelector";
import { deleteTodoss, doneTodoss } from "../redux-toolkit/todoSlice";

export const ShowOnlyCompletedTodos = () => {
  const { user } = useUserAuth();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector((state) => state.todos);
  // const todos = useSelector((state: TodosState) => [...state.todos]);
  // const dispatch = useDispatch();
  // const { completedTodo, deleteTodo } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // );
  return (
    <Box>
      {data &&
        data.map(
          (element) =>
            element.userId === user.uid &&
            element.isCompleted === true && (
              <Paper
                key={element._id + 3}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  textAlign: "center",
                  width: "100%",
                  // backgroundColor: "hsl(235, 24%, 19%, 100%)",
                  borderBottom: "0.5px solid gray",
                  height: {
                    xl: "70px",
                    xs: "60px",
                  },
                  padding: "2%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <input
                    id="cb1"
                    type="checkbox"
                    defaultChecked={element.isCompleted}
                    onClick={() => dispatch(doneTodoss(element))}
                  />

                  <label className="checkboxLabel" />

                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      fontSize: "20px",
                      textDecoration: "line-through",
                      color: "rgb(96,96,96)",
                      marginLeft: "2%",
                    }}
                  >
                    {element.title}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="deleteButton"
                    onClick={() => {
                      dispatch(deleteTodoss(element._id));
                    }}
                  >
                    <IconCross />
                  </button>
                </Box>
              </Paper>
            )
        )}
    </Box>
  );
};
