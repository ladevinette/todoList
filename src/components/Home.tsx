import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { User as FirebaseUser } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TodosState } from "../redux/reducer/todosReducer";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux/actions";
import { AddTodo } from "./AddTodo";
import { ShowOnlyCompletedTodos } from "./ShowOnlyCompletedTodos";
import { ShowOnlyActiveTodos } from "./ShowOnlyActiveTodos";
import { ShowAllTodos } from "./ShowAllTodos";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconMoon, IconSun } from "./IconCheck";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import {
  useAppDispatch,
  useAppSelector,
} from "../redux/actions/useTypedSelector";
import { getTodoss, deleteTodoss } from "../redux-toolkit/todoSlice";

export function Home() {
  const dispatch = useAppDispatch();
  const { data, activeTodo, error, isLoading } = useAppSelector(
    (state) => state.todos
  );
  // const todos = useSelector((state: TodosState) => [...state.todos]);
  // const activeTodos = useSelector((state: TodosState) => [
  //   ...state.activeTodos,
  // ]);
  // const dispatch = useDispatch();
  // const { getTodos, deleteTodo } = bindActionCreators(actionCreators, dispatch);
  const { user, logOut } = useUserAuth();
  const [homeUser, setHomeUser] = useState<FirebaseUser | null>(null);
  const [active, setActive] = useState("All");
  const Image = require("./Image/tlo.jpg");
  const lightBackground = require("./Image/images/bg-desktop-light.jpg");
  const lightBackgroundMobile = require("./Image/images/bg-mobile-light.jpg");
  const darkBackgroundMobile = require("./Image/images/bg-mobile-dark.jpg");
  const [lightTheme, setLightTheme] = useState<boolean>(true);

  console.log("siema");

  const light = createTheme({
    palette: {
      background: {
        default: "rgb(240, 240, 240)",
        paper: "white",
      },
      text: {
        primary: "rgb(0, 0, 0)",
        secondary: "rgb(0, 0, 0)",
      },
    },
    // components: {
    //   MuiButtonBase: {
    //     defaultProps: {
    //       disableRipple: true,
    //       color: "red",
    //     },
    //   },
    // },
  });

  const dark = createTheme({
    palette: {
      background: {
        default: "hsl(235, 21%, 11%)",
        paper: "hsl(235, 24%, 19%, 100%)",
      },
      text: {
        primary: "rgb(240, 240, 240)",
      },
    },
    // components: {
    //   MuiButtonBase: {
    //     defaultProps: {
    //       disableRipple: true,
    //     },
    //   },
    // },
  });

  const handleLogOut = () => {
    logOut();
  };

  useEffect(() => {
    setHomeUser(user);
  }, [user]);

  useEffect(() => {
    dispatch(getTodoss());
  }, [dispatch]);

  const clearCompleted = () => {
    if (data) {
      data.forEach(
        (element) =>
          element.isCompleted &&
          element.userId === user.uid &&
          dispatch(deleteTodoss(element._id))
      );
    }
  };

  const activeTodosAmount = activeTodo.filter(
    (element) => element.userId === homeUser?.uid
  );

  return (
    <ThemeProvider theme={lightTheme ? light : dark}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100vh",
          backgroundImage: {
            xl: lightTheme ? `url(${lightBackground})` : `url(${Image})`,
            lg: lightTheme ? `url(${lightBackground})` : `url(${Image})`,
            md: lightTheme ? `url(${lightBackground})` : `url(${Image})`,
            sm: lightTheme ? `url(${lightBackground})` : `url(${Image})`,
            xs: lightTheme
              ? `url(${lightBackgroundMobile})`
              : `url(${darkBackgroundMobile})`,
          },
          backgroundSize: "100%, 100%  ",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: "auto",
            marginRight: "auto",
            width: {
              xl: "40%",
              lg: "40%",
              md: "60%",
              sm: "70%",
              xs: "85%",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: {
                xl: "19%",
                lg: "14%",
                xs: "20%",
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                width: "20%",
                color: "white",
                letterSpacing: "10px",
                fontWeight: "700",
                fontSize: "40px",
                textAlign: "left",
              }}
            >
              TODO
            </Typography>

            <button
              className="themeButton"
              onClick={() => setLightTheme((prev) => !prev)}
            >
              {lightTheme ? <IconMoon /> : <IconSun />}
            </button>
          </Box>

          <AddTodo lightTheme={lightTheme} />
          <Box sx={{ width: "100%" }}>
            <Box>
              {active === "All" && <ShowAllTodos />}
              {active === "Active" && <ShowOnlyActiveTodos />}
              {active === "Completed" && <ShowOnlyCompletedTodos />}
            </Box>

            <Paper
              sx={{
                display: "flex",
                position: "relative",
                flexDirection: {
                  xl: "row",
                  // xs: "column",
                },
                justifyContent: "space-between",
                alignItems: "center",
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
                }}
              >
                <Typography
                  sx={{
                    marginLeft: "8px",
                    color: "rgb(96,96,96)",
                  }}
                >
                  {activeTodosAmount.length} todos left
                </Typography>
              </Box>

              <Box
                sx={{
                  display: {
                    xl: "flex",
                    lg: "flex",
                    md: "none",
                    sm: "none",
                    xs: "none",
                  },
                }}
              >
                <Button
                  // disableRipple
                  disableRipple
                  centerRipple
                  onClick={() => {
                    setActive("All");
                  }}
                  sx={
                    lightTheme
                      ? {
                          color: "(45, 85, 255)",
                          fontSize: "15px",
                          fontWeight: "600",
                        }
                      : { color: "(45, 85, 255)", fontSize: "15px" }
                  }
                >
                  All
                </Button>
                <Button
                  disableRipple
                  onClick={() => {
                    setActive("Active");
                  }}
                  sx={
                    lightTheme
                      ? {
                          color: "gray",
                          fontWeight: "600",
                          fontSize: "15px",
                          ":hover": { color: "rgb(47,79,79)" },
                        }
                      : {
                          color: "gray",
                          ":hover": { color: "white" },
                          fontSize: "15px",
                        }
                  }
                >
                  Active
                </Button>
                <Button
                  onClick={() => {
                    setActive("Completed");
                  }}
                  sx={
                    lightTheme
                      ? {
                          color: "gray",
                          fontWeight: "600",
                          fontSize: "15px",
                          ":hover": { color: "rgb(47,79,79)" },
                        }
                      : {
                          color: "gray",
                          ":hover": { color: "white" },
                          fontSize: "15px",
                        }
                  }
                  disableRipple
                >
                  Completed
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Button
                  disableRipple
                  variant="text"
                  onClick={clearCompleted}
                  sx={
                    lightTheme
                      ? {
                          color: "gray",
                          fontWeight: "600",
                          fontSize: "15px",
                          ":hover": { color: "rgb(47,79,79)" },
                        }
                      : {
                          color: "gray",
                          ":hover": { color: "white" },
                          fontSize: "15px",
                        }
                  }
                >
                  Clear Completed
                </Button>
              </Box>
            </Paper>
            <Paper
              sx={{
                display: {
                  xl: "none",
                  lg: "none",
                  md: "flex",
                  sm: "flex",
                  xs: "flex",
                },
                flexDirection: {
                  xl: "row",
                },
                alignItems: "center",
                height: {
                  xs: "60px",
                },
                marginTop: "8%",
                padding: "2%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  // disableRipple
                  disableRipple
                  centerRipple
                  onClick={() => {
                    setActive("All");
                  }}
                  sx={
                    lightTheme
                      ? {
                          color: "(45, 85, 255)",
                          fontSize: "15px",
                          fontWeight: "600",
                        }
                      : { color: "(45, 85, 255)", fontSize: "15px" }
                  }
                >
                  All
                </Button>
                <Button
                  disableRipple
                  onClick={() => {
                    setActive("Active");
                  }}
                  sx={
                    lightTheme
                      ? {
                          color: "gray",
                          fontWeight: "600",
                          fontSize: "15px",
                          ":hover": { color: "rgb(47,79,79)" },
                        }
                      : {
                          color: "gray",
                          ":hover": { color: "white" },
                          fontSize: "15px",
                        }
                  }
                >
                  Active
                </Button>
                <Button
                  onClick={() => {
                    setActive("Completed");
                  }}
                  sx={
                    lightTheme
                      ? {
                          color: "gray",
                          fontWeight: "600",
                          fontSize: "15px",
                          ":hover": { color: "rgb(47,79,79)" },
                        }
                      : {
                          color: "gray",
                          ":hover": { color: "white" },
                          fontSize: "15px",
                        }
                  }
                  disableRipple
                >
                  Completed
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>

        <LogoutIcon
          onClick={handleLogOut}
          fontSize="large"
          sx={{
            position: "absolute",
            top: "15px",
            left: "15px",
            cursor: "pointer",
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
