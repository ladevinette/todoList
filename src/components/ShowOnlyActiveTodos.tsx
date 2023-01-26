import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useUserAuth } from "../context/UserAuthContext";
import { actionCreators } from "../redux/actions";
import { TodosState } from "../redux/reducer/todosReducer";
import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { IconCross } from "./IconCross";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux-toolkit/hooks/useTypedSelector";
import { deleteTodoss, doneTodoss } from "../redux-toolkit/todoSlice";
import { useTheme } from "@mui/material/styles";

export const ShowOnlyActiveTodos = () => {
  const { user } = useUserAuth();
  // const todos = useSelector((state: TodosState) => [...state.todos]);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector((state) => state.todos);
  // const { completedTodo, deleteTodo } = bindActionCreators(
  //   actionCreators,
  //   dispatch
  // );
  // const checkboxRef = useRef<HTMLInputElement | null>(null);
  const theme = useTheme();
  return (
    <Box>
      {data &&
        data.map(
          (element) =>
            element.userId === user.uid &&
            element.isCompleted === false && (
              <Paper
                key={element._id + 3}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
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
                    style={
                      {
                        "--my-theme-background": `${theme.palette.background.paper}`,
                      } as React.CSSProperties
                    }
                  />

                  <label className="checkboxLabel" />

                  <Typography
                    sx={{
                      fontSize: "20px",
                      width: "100%",
                      textAlign: "left",
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
