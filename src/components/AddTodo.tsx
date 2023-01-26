import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { Input } from "@mui/material";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/actions";
import { useUserAuth } from "../context/UserAuthContext";
import Paper from "@mui/material/Paper";
import { addTodoss, getTodoss } from "../redux-toolkit/todoSlice";
import { useAppDispatch } from "../redux/actions/useTypedSelector";
import { useAppSelector } from "../redux-toolkit/hooks/useTypedSelector";
import { useTheme } from "@mui/material/styles";

type TodoProfile = {
  title: string;
};

type props = {
  lightTheme: boolean;
};

export const AddTodo = ({ lightTheme }: props) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useAppSelector((state) => state.todos);
  const { user } = useUserAuth();
  const { register, handleSubmit, reset } = useForm<TodoProfile>();
  // const { addTodo } = bindActionCreators(actionCreators, dispatch);
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  const handleOnSubmit = handleSubmit((data) => {
    if (data.title === null || data.title.trim() === "") {
      console.log("blad jeden");
      return;
    }

    const isComp = !!checkboxRef?.current?.checked;

    const newTodo = {
      title: data.title,
      userId: user.uid,
      isCompleted: isComp,
    };

    dispatch(addTodoss(newTodo));
    reset();
  });

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <Paper
        sx={{
          marginBottom: "5%",
          marginTop: "6%",
          height: {
            xl: "70px",
            xs: "60px",
          },
          display: "flex",
        }}
      >
        <form className="addTodoForm" onSubmit={handleOnSubmit}>
          <input
            id="cb1"
            type="checkbox"
            ref={checkboxRef}
            style={
              {
                "--my-theme-background": `${theme.palette.background.paper}`,
              } as React.CSSProperties
            }
          />
          <label className="checkboxLabel" />
          <Input
            fullWidth={true}
            disableUnderline={true}
            sx={
              lightTheme
                ? {
                    color: "black",
                    fontSize: {
                      xl: "25px",
                      xs: "18px",
                    },
                  }
                : {
                    color: "white",
                    fontSize: {
                      xl: "25px",
                      xs: "18px",
                    },
                  }
            }
            className="addTodo"
            {...register("title")}
            placeholder="Create a new todo..."
            autoComplete="off"
          />
        </form>
      </Paper>
    </Box>
  );
};
