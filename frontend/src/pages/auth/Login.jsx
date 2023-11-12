import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Box, Button } from "@chakra-ui/react";
import { Container, Grid, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Input, Space } from "antd";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { validationLogin } from "../../components/validation/Validation";
import { loginAuth } from "../../api";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const loginError = useSelector((state) => state.user.loginError);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: validationLogin,

    onSubmit: async (values, bag) => {
      await dispatch(
        loginAuth({ userName: values.userName, password: values.password })
      );
      formik.values.userName = "";
      formik.values.password = "";
      setTimeout(() => navigate(0), 5000);
    },
  });

  useEffect(() => {
    if (loginStatus === "success") {
      setTimeout(() => {
        formik.resetForm();
        navigate("/");
      }, 5000);
    }
  }, [loginStatus, formik, navigate]);

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          marginLeft: "239px",
          height: "100vh",
          marginTop: "-175px",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <main
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    background: "white",
                    height: "500px",
                    borderRadius: "25px",
                  }}
                >
                  <section
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DisabledByDefaultIcon
                      sx={{ mb: 0, width: 250, height: 100 }}
                    />
                    <Typography
                      component="h1"
                      variant="h6"
                      color="inherit"
                      noWrap
                      textAlign="left"
                      sx={{ flexGrow: 1 }}
                    >
                      XYZ-Cars
                    </Typography>

                    {localStorage.getItem("currentUserId") ? (
                      <h6 style={{ color: "green" }}>
                        Successful Login. You will be redirected after 5
                        seconds...
                      </h6>
                    ) : (
                      " "
                    )}
                  </section>

                  <section style={{ width: "650px" }}>
                    <form
                      onSubmit={formik.handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <InputLabel>
                          <strong>Username</strong>
                        </InputLabel>
                        <Space
                          style={{
                            width: "500px",
                            marginTop: "5px",
                            marginBottom: "5px",
                          }}
                          direction="vertical"
                        >
                          <Input
                            placeholder="Username"
                            name="userName"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.userName}
                          />
                          {formik.errors.userName && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                textAlign: "center",
                              }}
                            >
                              {formik.errors.userName}
                            </div>
                          )}
                        </Space>

                        <InputLabel>
                          <strong>Password</strong>
                        </InputLabel>
                        <Space
                          style={{
                            width: "500px",
                            marginTop: "5px",
                            marginBottom: "5px",
                          }}
                          direction="vertical"
                        >
                          <Input.Password
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />
                          {formik.errors.password && (
                            <div
                              style={{
                                color: "red",
                                fontSize: "12px",
                                textAlign: "center",
                              }}
                            >
                              {formik.errors.password}
                            </div>
                          )}
                        </Space>
                      </div>

                      <div style={{ marginTop: "10px", width: "500px" }}>
                        <Button
                          onClick={formik.handleSubmit}
                          bg="blue.500"
                          variant="contained"
                          style={{
                            borderRadius: "25px",

                            padding: "10px",
                            width: "25%",
                          }}
                        >
                          Login
                        </Button>
                      </div>
                      <div style={{ marginTop: "50px" }}>
                        Not Account Yet?{" "}
                        <Link
                          style={{ textDecoration: "none" }}
                          to={"/register"}
                        >
                          Sing Up
                        </Link>
                      </div>
                    </form>
                  </section>
                </div>
              </main>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default Login;
