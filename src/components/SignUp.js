import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useUserAuth } from "../context/UserAuthContext";

export const SignUp = () => {
  const { signUp } = useUserAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signUp(data.email, data.password);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "5%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "3%",
        width: {
          xl: "50%",
        },
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          marginTop: "20%",
          margin: "auto",
          padding: "3%",
          width: {
            xl: "40%",
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "500",
                marginBottom: "5%",
                fontSize: {
                  xl: "30px",
                },
              }}
            >
              SIN UP BELOW
            </Typography>
            <Box sx={{ marginBottom: "5%" }}>
              <TextField
                sx={{
                  width: {
                    xl: "100%",
                  },
                }}
                id="outlined-password-input"
                label="Email adress"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <Stack sx={{ width: "100%" }}>
                  <Alert variant="filled" severity="error">
                    EMAIL ADRESS IS REQUIRED
                  </Alert>
                </Stack>
              )}
            </Box>

            <Box>
              <TextField
                sx={{
                  width: {
                    xl: "100%",
                  },
                }}
                id="outlined-password-input"
                label="Password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <Stack sx={{ width: "100%" }}>
                  <Alert variant="filled" severity="error">
                    PASSWORD IS REQUIRED
                  </Alert>
                </Stack>
              )}
            </Box>
          </Box>

          <Button
            sx={{ width: "100%", marginTop: "5%", padding: "5%" }}
            type="submit"
            variant="contained"
            disableElevation
          >
            <Typography sx={{ fontSize: "15px", fontWeight: "700" }}>
              Sign Up
            </Typography>
          </Button>

          {error && (
            <Stack sx={{ width: "100%", marginTop: "20px" }} spacing={2}>
              <Alert variant="filled" severity="warning">
                {error && <p>{error}</p>}
              </Alert>
            </Stack>
          )}
        </form>
      </Box>
      <Box
        sx={{
          width: "40%",
          padding: "3%",
          margin: "auto",
          marginTop: "5%",
          border: "1px solid black",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          Have you got an account? Alredy <Link to="/">Sign In</Link>
        </Typography>
      </Box>
    </Box>
  );
};
