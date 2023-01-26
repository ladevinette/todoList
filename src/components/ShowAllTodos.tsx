import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useUserAuth } from "../context/UserAuthContext";
import { actionCreators } from "../redux/actions";
import { TodosState } from "../redux/reducer/todosReducer";
import { Box, Typography } from "@mui/material";
import { IconCross } from "./IconCross";
import { CustomCheckbox } from "./CustomCheckbox";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux-toolkit/hooks/useTypedSelector";
import { deleteTodoss, doneTodoss } from "../redux-toolkit/todoSlice";

export const ShowAllTodos = () => {
  const { user } = useUserAuth();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector((state) => state.todos);
  //redux toolkit
  // const appDispatch = useAppDispatch();
  // const { data, error, isLoading } = useAppSelector((state) => state.todos);

  // const todos = useSelector((state: TodosState) => [...state.todos]);
  // const dispatch = useDispatch();
  // const { completedTodo, deleteTodo } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // );
  // const [isHovering, setIsHovering] = useState(false);
  // const checkboxRef = useRef<HTMLInputElement | null>(null);

  // console.log(checkboxRef?.current?.checked);

  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <CustomCheckbox />
      {data &&
        data.map(
          (element) =>
            element.userId === user.uid && (
              <Paper
                key={element._id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  borderBottom: "0.5px solid gray",
                  height: {
                    xl: "70px",
                    xs: "60px",
                  },
                  justifyContent: "space-between",
                  padding: "2%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "90%",
                  }}
                >
                  <input
                    id="cb1"
                    type="checkbox"
                    defaultChecked={element.isCompleted}
                    // onClick={() => completedTodo(element)}
                    onClick={() => dispatch(doneTodoss(element))}
                    style={
                      {
                        "--my-theme-background": `${theme.palette.background.paper}`,
                      } as React.CSSProperties
                    }
                  />

                  <label className="checkboxLabel" />

                  <Typography
                    sx={{
                      fontSize: {
                        xl: "20px",
                        xs: "15px",
                      },
                      marginLeft: "2%",
                      width: "100%",
                    }}
                    style={
                      element.isCompleted
                        ? {
                            textDecoration: "line-through",
                            color: "rgb(96,96,96)",
                          }
                        : { textDecoration: "none" }
                    }
                  >
                    {element.title}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <button
                    className="deleteButton"
                    // onClick={() => {
                    //   deleteTodo(element._id);
                    // }}
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
