import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Box, Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { axiosRegister } from "../../api";
import { validationRegister } from "../../components/validation/Validation";
import { Input, Space } from "antd";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Register = () => {
  const registerInfo = useSelector((state) => state.user.registerUser);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationRegister,

    onSubmit: async (values, bag) => {
      await dispatch(axiosRegister({ values }));
    },
  });

  useEffect(() => {
    if (registerInfo) {
      formik.resetForm();
    }
  }, [registerInfo, formik]);

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
              <>
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
                      {registerInfo ? (
                        <h4
                          style={{
                            color:
                              registerInfo.userName === null ? "red" : "green",
                          }}
                        >
                          {registerInfo.message}
                        </h4>
                      ) : (
                        ""
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

                          <InputLabel>
                            <strong>Password Repeat</strong>
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
                              placeholder="Enter password"
                              name="passwordConfirm"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.passwordConfirm}
                              iconRender={(visible) =>
                                visible ? (
                                  <EyeTwoTone />
                                ) : (
                                  <EyeInvisibleOutlined />
                                )
                              }
                            />
                            {formik.errors.passwordConfirm && (
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  textAlign: "center",
                                }}
                              >
                                {formik.errors.passwordConfirm}
                              </div>
                            )}
                          </Space>
                        </div>

                        <div style={{ width: "500px", margin: "8px" }}>
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
                            Register
                          </Button>
                        </div>
                        <div style={{ marginTop: "50px" }}>
                          Already Registered?{" "}
                          <Link
                            style={{ textDecoration: "none" }}
                            to={"/signin"}
                          >
                            Login
                          </Link>
                        </div>
                      </form>
                    </section>
                  </div>
                </main>
              </>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default Register;
