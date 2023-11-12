import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button } from "@chakra-ui/react";
import { changePassword } from "../api";
import { changePasswordValidation } from "../components/validation/Validation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { InputLabel } from "@mui/material";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Space, Input } from "antd";
const PasswordInput = () => {
  const changePasswordMessage = useSelector(
    (state) => state.user.changePasswordMessage
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(changePasswordMessage);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: changePasswordValidation,

    onSubmit: async (values, bag) => {
      await dispatch(
        changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.password,
        }),
        (formik.values.oldPassword = ""),
        (formik.values.password = ""),
        (formik.values.passwordConfirm = "")
      );
    },
  });
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
          marginTop: "-325px",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 340,
                }}
              >
                <section style={{ width: "1050px" }}>
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
                        <strong>Current Password</strong>
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
                          name="oldPassword"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.oldPassword}
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                        {formik.errors.oldPassword && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "12px",
                              textAlign: "center",
                            }}
                          >
                            {formik.errors.oldPassword}
                          </div>
                        )}
                      </Space>

                      <InputLabel>
                        <strong>New Password</strong>
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
                          name="password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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
                        <strong>New Password Repeat</strong>
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
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
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

                    <div
                      style={{
                        marginTop: "10px",
                        textAlign: "end",
                        width: "500px",
                      }}
                    >
                      <Button
                        onClick={() => navigate("/dashboard")}
                        bg="red.500"
                        variant="contained"
                        style={{
                          borderRadius: "25px",
                          padding: "10px",
                          width: "20%",
                        }}
                        sx={{ mr: 4, textColor: "white" }}
                      >
                        Cancel
                      </Button>

                      <Button
                        onClick={formik.handleSubmit}
                        bg="blue.500"
                        variant="contained"
                        style={{
                          borderRadius: "25px",
                          padding: "10px",
                          width: "20%",
                        }}
                        sx={{ textColor: "white" }}
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                  {changePasswordMessage ? (
                    <div
                      style={
                        changePasswordMessage?.message.includes("wrong")
                          ? {
                              color: "red",
                              textAlign: "center",
                              marginTop: "50px",
                            }
                          : {
                              color: "green",
                              textAlign: "center",
                              marginTop: "50px",
                            }
                      }
                    >
                      {changePasswordMessage?.message}
                    </div>
                  ) : (
                    ""
                  )}
                </section>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PasswordInput;
